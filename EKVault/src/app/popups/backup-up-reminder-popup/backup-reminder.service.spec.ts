import { TestBed } from '@angular/core/testing';

import { BackupReminderService } from './backup-reminder.service';
import {SettingsService} from "../../settings/settings.service";
import {ImportExportService} from "../../import-export/import-export.service";
import {BackUpReminderPopUpService} from "./back-up-reminder-pop-up.service";

describe('BackupReminderService', () => {
  let service: BackupReminderService;

  let settingsSpy;
  let exportSpy;
  let backupReminderPopUpSpy;
  let backuptimeSpy;
  let doOrRemindBackupSpy;
  let localStorageSpy;
  let remindBackUpTimeSpy;
  beforeEach(() => {
    localStorageSpy = spyOn(localStorage, 'getItem');
    backuptimeSpy = jasmine.createSpyObj('ObservableValue', ['value']);
    settingsSpy = jasmine.createSpyObj('SettingsService', ['remindBackUpTime', 'doAutoBackup', 'doBackupSettings']);
    remindBackUpTimeSpy = spyOnProperty(settingsSpy, 'remindBackUpTime');
    remindBackUpTimeSpy.and.callFake(() => {
      console.log('settings spy');
      return backuptimeSpy;
    });
    exportSpy = jasmine.createSpyObj('ImportExportService', ['exportSettings', 'exportPasswords']);
    backupReminderPopUpSpy = jasmine.createSpyObj('BackupReminderPopUpService', ['openBackupReminder']);

    TestBed.configureTestingModule({
      providers: [
        {provide: SettingsService, useValue: settingsSpy},
        {provide: ImportExportService, useValue: exportSpy},
        {provide: BackUpReminderPopUpService, useValue: backupReminderPopUpSpy}
      ]
    });

    service = TestBed.get(BackupReminderService);
    doOrRemindBackupSpy = spyOn<any>(service, 'doBackupOrReminder');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should backup when it needs to', () => {
    console.log('test');
    backuptimeSpy.value.and.returnValue(29);
    const lastBackUpDate = new Date();
    lastBackUpDate.setMilliseconds(lastBackUpDate.getMilliseconds() - (86400000 * 30)); // Set the latest backup day to 30 days ago
    localStorageSpy.and.returnValue(lastBackUpDate.toISOString());

    service.tryBackUpOrReminder();

    expect(backuptimeSpy.value).toHaveBeenCalledTimes(1);
    expect(localStorageSpy).toHaveBeenCalledTimes(1);
    expect(localStorageSpy).toHaveBeenCalledWith('lastBackupReminder');
    expect(doOrRemindBackupSpy).toHaveBeenCalledTimes(1);
  });

  // it('should not backup when it does not need to', () => {
  //
  // });
  //
  // it('should never backup when backup time is set to never', () => {
  //   backuptimeSpy.value.and.returnValue(-1);
  // });
});
