import {FormControl, Validators} from "@angular/forms";
import {PasswordRequirementsService} from "../password/password-requirements.service";
import {containsLowerCase, containsNumeric, containsUpperCase} from "./password-validators";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PasswordFormControlFactory {
  public static getPasswordFormControl(): FormControl {
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
}
