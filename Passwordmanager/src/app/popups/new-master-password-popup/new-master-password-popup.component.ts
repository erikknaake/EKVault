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
import {PasswordFormControlFactory} from "../../shared/validators/passwordFormControlFactory";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-master-password-popup.component.html',
  styleUrls: ['./new-master-password-popup.component.scss']
})
export class NewMasterPasswordPopupComponent implements OnInit {
  public newPasswordControl = PasswordFormControlFactory.getPasswordFormControl();
  public origPasswordControl = PasswordFormControlFactory.getPasswordFormControl();
  public passwordIdenticalControl = new FormControl('', [
    Validators.required,
    identical(this.newPasswordControl)
  ]);
  public form: FormGroup;
  constructor(public readonly dialogRef: MatDialogRef<NewMasterPasswordPopupComponent>,
              private readonly formBuilder: FormBuilder,
              public readonly passwordControlFormFactory: PasswordFormControlFactory) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
    });
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
