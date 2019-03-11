import { Component, OnInit } from '@angular/core';
import {CSPRNGService} from "../Crypto/csprng.service";
import {CurrentSettingsService} from "../shared/current-settings.service";
import {MatSnackBar} from "@angular/material";
import {PasswordFileService} from "../shared/password-file.service";
import {MatConfigService} from "../mat-config.service";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  constructor(private readonly settings: CurrentSettingsService,
              private readonly snackbar: MatSnackBar,
              private readonly passwordFile: PasswordFileService,
              private readonly matConfigService: MatConfigService) { }

  ngOnInit() {
  }

  public newPassword(): void {
    const generated: string = CSPRNGService.generateCSPRNG(this.settings.passwordLength);
    //TODO: find username and domain
    console.log('generated: ', generated);
    this.passwordFile.addPassword('domain', generated, 'username').then(() => {
      this.snackbar.open('Password generated', 'Copy to clipboard', this.matConfigService.getMatConfig()).onAction().subscribe(() => {
        //Clipboard.copy(this.generated);
      });
    });
  }
}
