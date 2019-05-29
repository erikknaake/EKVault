import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material";
import {MatConfigService} from "../snackbar/mat-config.service";
import {ReplaceUsernamesPopupComponent} from "./replace-usernames-popup.component";

@Injectable({
  providedIn: 'root'
})
export class ReplaceUsernamePopupService {

  constructor(private readonly matDialog: MatDialog, private readonly matConfigService: MatConfigService) { }

  public popup(): Promise<boolean> {
    const dialogRef = this.matDialog.open(ReplaceUsernamesPopupComponent, this.matConfigService.getMatConfig());
    return dialogRef.afterClosed().toPromise();
  }
}
