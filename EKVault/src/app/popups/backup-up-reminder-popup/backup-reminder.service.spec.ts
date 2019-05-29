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

  beforeEach(() => {
    settingsSpy = jasmine.createSpyObj('SettingsService', ['remindBackupTime', 'doAutoBackup', 'doBackupSettings']);
    exportSpy = jasmine.createSpyObj('ImportExportService', ['exportSettings', 'exportPasswords']);
    backupReminderPopUpSpy = jasmine.createSpyObj('BackupReminderPopUpService', ['openBackupReminder']);

    TestBed.configureTestingModule({
      providers: [
        {provide: SettingsService, useValue: settingsSpy},
        {provide: ImportExportService, useValue: exportSpy},
        {provide: BackUpReminderPopUpService, useValue: backupReminderPopUpSpy}
      ]
    })
  });

  it('should be created', () => {
    const service: BackupReminderService = TestBed.get(BackupReminderService);
    expect(service).toBeTruthy();
  });

  //TODO actually test
});
