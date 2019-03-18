import {Component, Input, OnInit} from '@angular/core';
import {PasswordFileService} from "../../../shared/password-file.service";
import {SettingsService} from "../../settings.service";
import {SnackbarService} from "../../../popups/snackbar/snackbar.service";

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
    console.log('change username: ', this.username);
    this.passwordFile.changeUsername(this.oldUsername, this.username).then(() => {
      this.settings.changeUsername(this.oldUsername, this.username);
      this.snackbar.open('Username changed', 'Ok');
      this.oldUsername = this.username;
    }).catch((reason) => {
      if(reason === 'username')
        this.snackbar.open('Username is al in gebruik', 'Ok');
    });
  }

  public discardChanges(): void {
    this.username = this.oldUsername;
  }

  public deleteUsername(): void {
    // TODO
  }
}
