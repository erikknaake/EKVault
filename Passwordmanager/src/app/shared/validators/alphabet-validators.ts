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
    let isAllowed: boolean = true;
    // for(let character of control.value) {
    //   let reg = new RegExp(`[${character}]`);
    //   if(control.value.match(reg).length > 1) {
    //     isAllowed = false;
    //     break;
    //   }
    // } //TODO
    return isAllowed ? null : {'noDoubleCharacters': {value: control.value}};
  };
}
