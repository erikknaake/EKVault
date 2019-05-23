import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-backup-reminder',
  templateUrl: './backup-reminder-pop-up.component.html',
  styleUrls: ['./backup-reminder-pop-up.component.scss']
})
export class BackupReminderPopUpComponent implements OnInit {

  constructor(public readonly dialogRef: MatDialogRef<BackupReminderPopUpComponent>) { }

  ngOnInit() {
  }

}
