import { Injectable } from '@angular/core';
import {SettingsService} from "../../settings/settings.service";
import {ImportExportService} from "../../import-export/import-export.service";
import {BackUpReminderPopUpService} from "./back-up-reminder-pop-up.service";

@Injectable({
  providedIn: 'root'
})
export class BackupReminderService {

  private static readonly LAST_REMINDER_KEY = 'lastBackupReminder';

  constructor(private readonly settings: SettingsService,
              private readonly exportService: ImportExportService,
              private readonly backupReminderPopup: BackUpReminderPopUpService) {
  }

  private static needsReminder(): boolean {
    return true; // TODO
  }

  private static setLastReminderToNow(): void {
    console.log( new Date().toDateString());
    localStorage.setItem(BackupReminderService.LAST_REMINDER_KEY, new Date().toDateString());
  }

  private doAutobackup(): boolean {
    return this.settings.doAutoBackUp.value;
  }

  private makeBackup(): void {
    // Force to always backup passwords if things are backed up automaticly
    this.exportService.exportPasswords();
    if(this.settings.doBackupSettings) {
      this.exportService.exportSettings();
    }
  }

  private doBackupOrReminder(): void {
    if (this.doAutobackup()) {
      this.makeBackup();
    } else {
      this.backupReminderPopup.openBackupReminder();
    }
    BackupReminderService.setLastReminderToNow();
  }

  public tryBackUpOrReminder(): void {
    if(BackupReminderService.needsReminder()) {
      this.doBackupOrReminder();
    }
  }
}
