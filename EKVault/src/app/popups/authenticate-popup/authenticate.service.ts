import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material";
import {AuthenticatePopupComponent} from "./authenticate-popup.component";
import {MatConfigService} from "../snackbar/mat-config.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private readonly matDialog: MatDialog, private readonly matConfigService: MatConfigService) { }

  public requestMasterPassword(): Promise<string> {
    const dialogRef = this.matDialog.open(AuthenticatePopupComponent, this.matConfigService.getMatConfig());
    return dialogRef.afterClosed().toPromise();
  }
}
