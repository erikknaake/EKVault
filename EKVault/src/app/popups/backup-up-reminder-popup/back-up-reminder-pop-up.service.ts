import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material";
import {MatConfigService} from "../mat-config.service";
import {BackupReminderPopUpComponent} from "./backup-reminder-pop-up.component";

@Injectable({
  providedIn: 'root'
})
export class BackUpReminderPopUpService {

  constructor(private readonly matDialog: MatDialog, private readonly matConfig: MatConfigService) { }

  public openBackupReminder(): Promise<void> {
    const dialogRef = this.matDialog.open(BackupReminderPopUpComponent, this.matConfig.getMatConfig());
    return dialogRef.afterClosed().toPromise();
  }
}
