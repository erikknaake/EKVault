import { Component, OnInit } from '@angular/core';
import {CurrentSettingsService} from "../current-settings.service";
import {FormControl, Validators} from "@angular/forms";
import {
  containsLowerCase,
  containsNumeric,
  containsUpperCase,
  identical
} from "../shared/validators/password-validators";

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
    identical(this.passwordControl.value.toString())
  ]);

  constructor(private readonly settingsService: CurrentSettingsService) { }

  ngOnInit() {
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

  public getPasswordLength(): number {
    return this.settingsService.passwordLength;
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
    console.log('one: ', control.value);
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
    console.log('identical: ', this.passwordIdenticalControl.value);
    if(this.passwordIdenticalControl.hasError('required')) {
      return 'You must enter a value';
    } else if(this.passwordIdenticalControl.hasError('identical')) {
      return 'The passwords must be identical';
    }
  }


}
