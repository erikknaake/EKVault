import { Component, OnInit } from '@angular/core';
import {SettingsService} from "./settings.service";
import {FormControl, Validators} from "@angular/forms";
import {
  containsLowerCase,
  containsNumeric,
  containsUpperCase,
  identical
} from "../shared/validators/password-validators";
import { saveAs } from 'file-saver';
import {PasswordFileService} from "../shared/password-file.service";
import {UploadFileService} from "../popups/upload-file-popup/upload-file.service";
import {IFile} from "../shared/IFile";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  private readonly MAX_PASSWORD_LENGTH = 128;
  private readonly MIN_PASSWORD_LENGTH = 8;

  public passwordLengthControl = new FormControl('', [
    Validators.required,
    Validators.max(this.MAX_PASSWORD_LENGTH),
    Validators.min(this.MIN_PASSWORD_LENGTH)
  ]);
  public passwordControl = this.getPasswordFormControl();
  public origPasswordControl = this.getPasswordFormControl();
  public passwordIdenticalControl = new FormControl('', [
    Validators.required,
    identical(this.passwordControl)
  ]);

  constructor(public readonly settings: SettingsService,
              private readonly passwordFile: PasswordFileService,
              private readonly uploadService: UploadFileService) { }

  ngOnInit() {
    this.passwordLengthControl.setValue(this.settings.passwordLength.value);
  }

  private getPasswordFormControl(): FormControl {
    return new FormControl('', [
      Validators.required,
      Validators.maxLength(this.MAX_PASSWORD_LENGTH),
      Validators.minLength(this.MIN_PASSWORD_LENGTH),
      containsNumeric(),
      containsLowerCase(),
      containsUpperCase()
    ]);
  }

  public getPasswordLengthError(): string {
    if(this.passwordLengthControl.hasError('required')) {
      return 'You must enter a value';
    } else if (this.passwordLengthControl.hasError('max')) {
      return `A password can at most be ${this.MAX_PASSWORD_LENGTH} characters`;
    } else if (this.passwordLengthControl.hasError('min')) {
      return `A password must be at least ${this.MIN_PASSWORD_LENGTH} characters`;
    }
  }

  public getPasswordError(control: FormControl): string {
    if(control.hasError('required')) {
      return 'You must enter a value';
    } else if (control.hasError('maxlength')) {
      return `A password can at most be ${this.MAX_PASSWORD_LENGTH} characters`;
    } else if (control.hasError('minlength')) {
      return `A password must be at least ${this.MIN_PASSWORD_LENGTH} characters`;
    } else if (control.hasError('containsNumeric')) {
      return 'A password should contain a number';
    } else if (control.hasError('containsLowerCase')) {
      return 'A password should contain a lowercase character';
    } else if (control.hasError('containsUpperCase')) {
      return 'A password should contain a uppercase character';
    }
  }

  public getPasswordIdenticalError(): string {
    if(this.passwordIdenticalControl.hasError('required')) {
      return 'You must enter a value';
    } else if(this.passwordIdenticalControl.hasError('identical')) {
      return 'The passwords must be identical';
    }
  }

  public importPasswords(): void {
    this.uploadService.requestfile('.enc', 'Password backup').then((file: IFile) => {
      this.passwordFile.restorePasswords(file.file.value);
      //TODO: make interface to DIP this
    });
  }

  public exportPasswords(): void {
    saveAs(new Blob([this.passwordFile.getAllEncryptedPasswords()], {type: 'text/plain'}), 'Password backup.enc', true);
  }

  public importSettings(): void {

  }

  public exportSettings(): void {

  }

  public saveSettings(): void {
    this.settings.passwordLengthValue = this.passwordLengthControl.value;
    this.settings.save();
  }

  public discardSettings(): void {
    this.settings.load();
  }

  public restoreDefaultSettings(): void {
    this.settings.setDefault();
    this.settings.save();
  }
}
