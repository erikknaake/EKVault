import {Component, OnInit} from '@angular/core';
import {PasswordUIHelperService} from "../password-uihelper.service";
import {PasswordFileService} from "../../shared/password-file.service";
import {SettingsService} from "../../settings/settings.service";
import {SnackbarService} from "../../popups/snackbar/snackbar.service";

@Component({
  selector: 'app-load-password',
  templateUrl: './load-password.component.html',
  styleUrls: ['./load-password.component.scss']
})
export class LoadPasswordComponent implements OnInit {

  constructor(private readonly passwordFile: PasswordFileService,
              public readonly passwordUIHelper: PasswordUIHelperService,
              private readonly snackbar: SnackbarService) { }

  ngOnInit() {
    this.passwordUIHelper.passwordLabel = 'Loaded password';
    this.passwordUIHelper.title = 'Load password';
  }

  public loadPassword() {
    this.passwordFile.getPassword(this.passwordUIHelper.domain, this.passwordUIHelper.selectedUsername).then((password: string) => {
      this.passwordUIHelper.password = password;
      this.snackbar.open('Password loaded', 'Copy to clipboard').onAction().subscribe(() => {
        this.passwordUIHelper.copyPassword();
      })
    });
  }
}
