import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-replace-usernames-popup',
  templateUrl: './replace-usernames-popup.component.html',
  styleUrls: ['./replace-usernames-popup.component.scss']
})
export class ReplaceUsernamesPopupComponent implements OnInit {

  constructor(public readonly dialogRef: MatDialogRef<ReplaceUsernamesPopupComponent>) { }

  ngOnInit() {
  }

  public ok(): void {
    this.dialogRef.close(true);
  }

  public cancel(): void {
    this.dialogRef.close(false);
  }
}
