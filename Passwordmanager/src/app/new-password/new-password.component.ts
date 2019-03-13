import {Component, OnInit} from '@angular/core';
import {CSPRNGService} from "../Crypto/csprng.service";
import {CurrentSettingsService} from "../settings/current-settings.service";
import {PasswordFileService} from "../shared/password-file.service";
import {SnackbarService} from "../popups/snackbar/snackbar.service";
import {PasswordUIHelperService} from "../shared/password-uihelper.service";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  constructor(private readonly settings: CurrentSettingsService,
              private readonly snackbar: SnackbarService,
              private readonly passwordFile: PasswordFileService,
              public readonly passwordUIHelper: PasswordUIHelperService) {
  }

  ngOnInit() {
    this.passwordUIHelper.password = this.generatePassword();
  }

  public addPassword(): void {
    console.log(this.passwordUIHelper.domain);
    this.passwordFile.addPassword(this.passwordUIHelper.domain, this.passwordUIHelper.password, this.passwordUIHelper.selectedUsername).then(() => {
      this.snackbar.open('Password password', 'Copy to clipboard').onAction().subscribe(() => {
        this.passwordUIHelper.copyPassword();
      });
    });
  }

  public generatePassword(): string {
    return CSPRNGService.generateCSPRNG(this.settings.passwordLength);
  }
}
