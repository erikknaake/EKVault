import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material";
import {NewMasterPasswordPopupComponent} from "./new-master-password-popup.component";
import {IPasswordChange} from "../../shared/IPasswordChange";

@Injectable({
  providedIn: 'root'
})
export class NewMasterPasswordService {

  constructor(private readonly matDialog: MatDialog) { }

  public requestMasterPassword(): Promise<IPasswordChange> {
    const dialogRef = this.matDialog.open(NewMasterPasswordPopupComponent, {width: '25em', height: '16em'});
    return dialogRef.afterClosed().toPromise();
  }
}
