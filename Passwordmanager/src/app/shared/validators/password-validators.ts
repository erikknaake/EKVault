import {AbstractControl, FormControl, ValidatorFn} from "@angular/forms";

function checkRegEx(regString: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const reg: RegExp = new RegExp(regString);
    const isAllowed: boolean = reg.test(control.value);
    return isAllowed ? null : {'containsNumeric': {value: control.value}};
  };
}

export function containsNumeric(): ValidatorFn {
  return checkRegEx("[0-9]");
}

export function containsLowerCase(): ValidatorFn {
  return checkRegEx("[a-z]");
}

export function containsUpperCase(): ValidatorFn {
  return checkRegEx("[A-Z]");
}

export function identical(inputControl: FormControl): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const isAllowed: boolean = control.value === inputControl.value;
    return isAllowed ? null : {'identical': {value: control.value}};
  };
}

