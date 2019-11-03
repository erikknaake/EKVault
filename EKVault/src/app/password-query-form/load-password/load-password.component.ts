import {Component, OnInit} from '@angular/core';
import {PasswordUIHelperService} from "../password-uihelper.service";
import {PasswordFileService} from "../../shared/password/password-file.service";
import {SettingsService} from "../../settings/settings.service";
import {SnackbarService} from "../../popups/snackbar/snackbar.service";
import {Router} from "@angular/router";
import {EditPasswordService} from "../../edit-password/edit-password.service";

@Component({
  selector: 'app-load-password',
  templateUrl: './load-password.component.html',
  styleUrls: ['./load-password.component.scss']
})
export class LoadPasswordComponent implements OnInit {

  constructor(private readonly passwordFile: PasswordFileService,
              public readonly passwordUIHelper: PasswordUIHelperService,
              private readonly snackbar: SnackbarService,
              private readonly router: Router,
              private readonly editPassword: EditPasswordService) { }

  ngOnInit() {
    this.passwordUIHelper.passwordLabel = 'Loaded password';
    this.passwordUIHelper.title = 'Load password';
    this.passwordUIHelper.getDomain().then((value) => {
      this.editPassword.domain = value;
    });
    this.editPassword.username = this.passwordUIHelper.selectedUsername;
  }

  public loadPassword(): void {
    this.passwordFile.getPassword(this.editPassword.domain, this.passwordUIHelper.selectedUsername).then((password: string) => {
      this.passwordUIHelper.password = password;
      this.snackbar.open('Password loaded', 'Copy to clipboard').onAction().subscribe(() => {
        this.passwordUIHelper.copyPassword();
      });
    }).catch((reason) => {
      this.snackbar.open('Incorrect masterpassword, or no passwords in vault', 'Ok');
    });
  }

  public navigateToEdit() {
    this.router.navigateByUrl('/edit');
  }
}
