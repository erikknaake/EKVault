import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  containsLowerCase,
  containsNumeric,
  containsUpperCase,
  identical
} from "../../shared/validators/password-validators";
import {PasswordRequirementsService} from "../../shared/password/password-requirements.service";
import {MatDialogRef} from "@angular/material";
import {IChangePasswordForm} from "./IChangePasswordForm";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-master-password-popup.component.html',
  styleUrls: ['./new-master-password-popup.component.scss']
})
export class NewMasterPasswordPopupComponent implements OnInit {
  public passwordControl = NewMasterPasswordPopupComponent.getPasswordFormControl();
  public origPasswordControl = NewMasterPasswordPopupComponent.getPasswordFormControl();
  public passwordIdenticalControl = new FormControl('', [
    Validators.required,
    identical(this.passwordControl)
  ]);
  public form: FormGroup;
  constructor(public readonly dialogRef: MatDialogRef<NewMasterPasswordPopupComponent>, private readonly formBuilder: FormBuilder) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      oldPassword: '',
      newPassword: ''
    });
  }

  private static getPasswordFormControl(): FormControl {
    return new FormControl('', [
      Validators.required,
      Validators.maxLength(PasswordRequirementsService.MAX_PASSWORD_LENGTH),
      Validators.minLength(PasswordRequirementsService.MIN_PASSWORD_LENGTH),
      containsNumeric(),
      containsLowerCase(),
      containsUpperCase()
    ]);
  }

  public getPasswordError(control: FormControl): string {
    if(control.hasError('required')) {
      return 'You must enter a value';
    } else if (control.hasError('maxlength')) {
      return `A password can at most be ${PasswordRequirementsService.MAX_PASSWORD_LENGTH} characters`;
    } else if (control.hasError('minlength')) {
      return `A password must be at least ${PasswordRequirementsService.MIN_PASSWORD_LENGTH} characters`;
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

  public submit(form: IChangePasswordForm) {
    this.dialogRef.close(form.value);
  }
}
