import {AbstractControl, ValidatorFn} from "@angular/forms";

export function noJSON(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const reg: RegExp = new RegExp("[:,]");
    const isAllowed: boolean = !reg.test(control.value);
    return isAllowed ? null : {'noJSON': {value: control.value}};
  };
}

export function noDoubleCharacters(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let isAllowed = true;
    let checkedChars = '';
    for (const character of control.value) {
      if (checkedChars.includes(character)) {
        isAllowed = false;
        break;
      } else {
        checkedChars += character;
      }
    }
    return isAllowed ? null : {'noDoubleCharacters': {value: control.value}};
  };
}
