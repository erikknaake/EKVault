import {Component, OnInit} from '@angular/core';
import {CSPRNGService} from "../../Crypto/csprng.service";
import {SettingsService} from "../../settings/settings.service";
import {PasswordFileService} from "../../shared/password/password-file.service";
import {SnackbarService} from "../../popups/snackbar.service";
import {PasswordUIHelperService} from "../password-uihelper.service";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  constructor(private readonly settings: SettingsService,
              private readonly snackbar: SnackbarService,
              private readonly passwordFile: PasswordFileService,
              public readonly passwordUIHelper: PasswordUIHelperService) {
  }

  ngOnInit() {
    this.passwordUIHelper.passwordLabel = 'Generated password';
    this.passwordUIHelper.title = 'Generate password';
  }

  public addPassword(): void {
    this.passwordUIHelper.getDomain().then((domain: string) => {
      this.passwordFile.addPassword(domain, this.passwordUIHelper.password, this.passwordUIHelper.selectedUsername).then(() => {
        this.snackbar.open('Password generated', 'Copy to clipboard').onAction().subscribe(() => {
          this.passwordUIHelper.copyPassword();
        });
      });
    });

  }
}
