import {AbstractControl, FormControl, ValidatorFn} from "@angular/forms";


export function containsNumeric(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const reg: RegExp = new RegExp("[0-9]");
    const isAllowed: boolean = reg.test(control.value);
    return isAllowed ? null : {'containsNumeric': {value: control.value}};
  };
}

export function containsLowerCase(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const reg: RegExp = new RegExp("[a-z]");
    const isAllowed: boolean = reg.test(control.value);
    return isAllowed ? null : {'containsLowercase': {value: control.value}};
  };
}

export function containsUpperCase(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const reg: RegExp = new RegExp("[A-Z]");
    const isAllowed: boolean = reg.test(control.value);
    return isAllowed ? null : {'containsUpperCase': {value: control.value}};
  };
}

export function identical(inputControl: FormControl): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const isAllowed: boolean = control.value !== inputControl.value;
    return isAllowed ? null : {'identical': {value: control.value}};
  };
}
