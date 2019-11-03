import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material";
import {NewMasterPasswordPopupComponent} from "./new-master-password-popup.component";
import {IPasswordChange} from "../../shared/password/IPasswordChange";
import {MatConfigService} from "../snackbar/mat-config.service";

@Injectable({
  providedIn: 'root'
})
export class NewMasterPasswordService {

  constructor(private readonly matDialog: MatDialog, private readonly matConfig: MatConfigService) { }

  public requestMasterPassword(): Promise<IPasswordChange> {
    const dialogRef = this.matDialog.open(NewMasterPasswordPopupComponent, this.matConfig.getMatConfig());
    return dialogRef.afterClosed().toPromise();
  }
}
