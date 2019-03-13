import { Component, OnInit } from '@angular/core';
import {CSPRNGService} from "../../Crypto/csprng.service";
import {CurrentSettingsService} from "../../settings/current-settings.service";
import {MatSnackBar} from "@angular/material";
import {Clipboard} from 'ts-clipboard';
import {PasswordFileService} from "../../shared/password-file.service";
@Component({
  selector: 'app-new-password',
  templateUrl: './new-master-password-popup.component.html',
  styleUrls: ['./new-master-password-popup.component.scss']
})
export class NewMasterPasswordPopupComponent implements OnInit {

  constructor() { }


  ngOnInit() {

  }


}
