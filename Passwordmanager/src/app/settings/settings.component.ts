import {Component, OnInit} from '@angular/core';
import {SettingsService} from "./settings.service";
import {FormControl, Validators} from "@angular/forms";
import {saveAs} from 'file-saver';
import {PasswordFileService} from "../shared/password/password-file.service";
import {UploadFileService} from "../popups/upload-file-popup/upload-file.service";
import {IFile} from "../shared/IFile";
import {SnackbarService} from "../popups/snackbar.service";
import {PasswordRequirementsService} from "../shared/password/password-requirements.service";
import {AlphabetService} from "../shared/password/alphabet.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public passwordLengthControl = new FormControl('', [
    Validators.required,
    Validators.max(PasswordRequirementsService.MAX_PASSWORD_LENGTH),
    Validators.min(PasswordRequirementsService.MIN_PASSWORD_LENGTH)
  ]);


  constructor(public readonly settings: SettingsService,
              private readonly passwordFile: PasswordFileService,
              private readonly uploadService: UploadFileService,
              private readonly snackbar: SnackbarService,
              public readonly alphabetService: AlphabetService) { }

  ngOnInit() {
    this.passwordLengthControl.setValue(this.settings.passwordLength.value);
  }

  public getPasswordLengthError(): string {
    if(this.passwordLengthControl.hasError('required')) {
      return 'You must enter a value';
    } else if (this.passwordLengthControl.hasError('max')) {
      return `The password length can at most be ${PasswordRequirementsService.MAX_PASSWORD_LENGTH} characters`;
    } else if (this.passwordLengthControl.hasError('min')) {
      return `The password length must be at least ${PasswordRequirementsService.MIN_PASSWORD_LENGTH} characters`;
    }
  }

  public changeMasterpassword(): void {
    this.passwordFile.requestNewMasterPassword().then(() => {
      this.snackbar.open('Changed masterpassword', 'Ok');
    }).catch((reason => {
      this.snackbar.open('Password is incorrect', 'Ok');
    }));
  }

  public importPasswords(): void {
    this.uploadService.requestfile('.enc', 'Password backup').then((file: IFile) => {
      this.passwordFile.restorePasswords(file.file.value);
    }).catch((reason => {

    }));
  }

  public exportPasswords(): void {
    saveAs(new Blob([this.passwordFile.getAllEncryptedPasswords()], {type: 'text/plain'}), 'Password backup.enc', true);
  }

  public importSettings(): void {
    this.uploadService.requestfile('.json', 'Settings backup').then((file: IFile) => {
      this.settings.restoreJSON(file.file.value);
      this.snackbar.open('Restored settings', 'Ok');
    }).catch((reason) => {

    });
  }

  public exportSettings(): void {
    saveAs(new Blob([this.settings.toJSON()], {type: 'text/plain'}), 'Settings.json', true);
  }

  public saveSettings(): void {
    this.settings.passwordLengthValue = this.passwordLengthControl.value;
    this.settings.save();
    this.snackbar.open('Saved settings', 'Ok')
  }

  public discardSettings(): void {
    this.settings.load();
    this.snackbar.open('Discarded changes', 'Ok');
  }

  public restoreDefaultSettings(): void {
    this.settings.setDefault();
    this.settings.save();
    this.snackbar.open('Restored defaults', 'Ok');
  }

  public changeTheme(isDarkTheme: boolean): void {
      this.settings.isDarkThemeValue = isDarkTheme;
      this.settings.save();
  }
}
