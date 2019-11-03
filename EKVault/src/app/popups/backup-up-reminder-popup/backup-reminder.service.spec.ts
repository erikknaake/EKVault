import { TestBed } from '@angular/core/testing';

import { BackupReminderService } from './backup-reminder.service';
import {SettingsService} from "../../settings/settings.service";
import {ImportExportService} from "../../import-export/import-export.service";
import {BackUpReminderPopUpService} from "./back-up-reminder-pop-up.service";
import {ObservableValue} from "../../shared/ObservableValue";

describe('BackupReminderService', () => {
  let service: BackupReminderService;

  let settingsSpy;
  let exportSpy;
  let backupReminderPopUpSpy;
  let doOrRemindBackupSpy;
  let localStorageSpy;

  beforeEach(() => {
    localStorageSpy = spyOn(localStorage, 'getItem');
    exportSpy = jasmine.createSpyObj('ImportExportService', ['exportSettings', 'exportPasswords']);
    backupReminderPopUpSpy = jasmine.createSpyObj('BackupReminderPopUpService', ['openBackupReminder']);

    TestBed.configureTestingModule({
      providers: [
        SettingsService,
        {provide: ImportExportService, useValue: exportSpy},
        {provide: BackUpReminderPopUpService, useValue: backupReminderPopUpSpy}
      ]
    });

    const settings = TestBed.get(SettingsService);
    settingsSpy = spyOnProperty(settings, 'remindBackUpTime', 'get');

    service = TestBed.get(BackupReminderService);
    doOrRemindBackupSpy = spyOn<any>(service, 'doBackupOrReminder');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should backup when it needs to', () => {
    settingsSpy.and.callFake(() => {
      const result = new ObservableValue<number>();
      result.value = 29;
      return result;
    });

    const lastBackUpDate = new Date();
    lastBackUpDate.setMilliseconds(lastBackUpDate.getMilliseconds() - (86400000 * 30)); // Set the latest backup day to 30 days ago
    localStorageSpy.and.returnValue(lastBackUpDate.toISOString());

    service.tryBackUpOrReminder();

    expect(localStorageSpy).toHaveBeenCalledTimes(2);
    expect(localStorageSpy).toHaveBeenCalledWith('lastBackupReminder');
    expect(doOrRemindBackupSpy).toHaveBeenCalledTimes(1);
  });

  it('should not backup when it does not needs to', () => {
    settingsSpy.and.callFake(() => {
      const result = new ObservableValue<number>();
      result.value = 30;
      return result;
    });

    const lastBackUpDate = new Date();
    lastBackUpDate.setMilliseconds(lastBackUpDate.getMilliseconds() - (86400000 * 30)); // Set the latest backup day to 30 days ago
    localStorageSpy.and.returnValue(lastBackUpDate.toISOString());

    service.tryBackUpOrReminder();

    expect(localStorageSpy).toHaveBeenCalledTimes(2);
    expect(localStorageSpy).toHaveBeenCalledWith('lastBackupReminder');
    expect(doOrRemindBackupSpy).toHaveBeenCalledTimes(1);
  });

  it('should never backup when backup time is set to never', () => {
    settingsSpy.and.callFake(() => {
      const result = new ObservableValue<number>();
      result.value = -1;
      return result;
    });

    const lastBackUpDate = new Date();
    lastBackUpDate.setMilliseconds(lastBackUpDate.getMilliseconds() - (86400000 * 3000)); // Set the latest backup day to 3000 days ago
    localStorageSpy.and.returnValue(lastBackUpDate.toISOString());

    service.tryBackUpOrReminder();

    expect(localStorageSpy).toHaveBeenCalledTimes(1);
    expect(doOrRemindBackupSpy).toHaveBeenCalledTimes(0);
  });

});
