import {Component, Input, OnInit} from '@angular/core';
import {SettingsService} from "../settings.service";
import {SnackbarService} from "../../popups/snackbar.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-usernames',
  templateUrl: './edit-usernames.component.html',
  styleUrls: ['./edit-usernames.component.scss']
})
export class EditUsernamesComponent implements OnInit {

  public usernameControl: FormControl = new FormControl('', Validators.required);
  constructor(public readonly settings: SettingsService,
              private readonly snackbar: SnackbarService) { }

  ngOnInit() {
  }

  public saveDefaultUsername(): void {
    this.settings.save();
    this.snackbar.open('Changed default username', 'Ok');
  }

  public loadDefaultUsername(): void {
    this.settings.load();
    this.snackbar.open('Restored default username', 'Ok');
  }

  public addUsername(username: string): void {
    this.settings.addUsername(username).then(() => {
      this.snackbar.open('Username added', 'Ok');
    }).catch((reason) => {
      this.snackbar.open('Username already exists', 'Ok');
    });
  }
}
