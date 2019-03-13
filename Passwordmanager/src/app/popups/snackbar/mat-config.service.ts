import { Injectable } from '@angular/core';
import {MatDialogConfig} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class MatConfigService {

  constructor() { }

  public getMatConfig(): MatDialogConfig {
    return {width: '25em', height: '14em', hasBackdrop: true};
  }
}
