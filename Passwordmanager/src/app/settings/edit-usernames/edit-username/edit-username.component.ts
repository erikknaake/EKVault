import {Component, Input, OnInit} from '@angular/core';
import {PasswordFileService} from "../../../shared/password/password-file.service";
import {SettingsService} from "../../settings.service";
import {SnackbarService} from "../../../popups/snackbar.service";

@Component({
  selector: 'app-edit-username',
  templateUrl: './edit-username.component.html',
  styleUrls: ['./edit-username.component.scss']
})
export class EditUsernameComponent implements OnInit {

  @Input() public username: string;
  private oldUsername: string;
  constructor(private readonly passwordFile: PasswordFileService,
              private readonly settings: SettingsService,
              private readonly snackbar: SnackbarService) { }

  ngOnInit() {
    this.oldUsername = this.username;
  }

  public changeUsername(): void {
    this.passwordFile.changeUsername(this.oldUsername, this.username).then(() => {
      this.settings.changeUsername(this.oldUsername, this.username);
      this.snackbar.open('Username changed', 'Ok');
      this.oldUsername = this.username;
    }).catch((reason) => {
      if (reason === 'username') {
        this.snackbar.open('Username is already used', 'Ok');
      }
    });
  }

  public discardChanges(): void {
    this.username = this.oldUsername;
  }

  public deleteUsername(): void {
    this.passwordFile.deleteUsername(this.username).then(() => {
      this.settings.deleteUsername(this.username);
      this.snackbar.open('Deleted username', 'Ok');
    }).catch(() => {

    });
  }
}
