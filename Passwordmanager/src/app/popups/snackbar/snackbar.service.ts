import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from "@angular/material";
import {MatConfigService} from "./mat-config.service";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private readonly snackbar: MatSnackBar, private readonly matconfig: MatConfigService) { }

  public open(text: string, action: string): MatSnackBarRef<any> {
    return this.snackbar.open(text, action, this.matconfig.getMatConfig());
  }
}
