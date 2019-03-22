import { Injectable } from '@angular/core';
import {MatDialogConfig, MatSnackBarConfig} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class MatConfigService {

  constructor() { }

  public getMatConfig(): MatDialogConfig {
    return {width: '25em', height: '25em', hasBackdrop: true};
  }

  public getMatSnackBarConfig(): MatSnackBarConfig {
    return {duration: 5000}
  }
}
