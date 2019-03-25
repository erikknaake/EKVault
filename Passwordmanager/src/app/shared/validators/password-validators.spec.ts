import {containsLowerCase, containsNumeric, containsUpperCase, identical} from "./password-validators";
import {FormControl} from "@angular/forms";

describe('Password validators', () => {
  let formControl: FormControl;
  describe('containsNumeric', () => {
    beforeEach(() => {
      formControl = new FormControl('', [containsNumeric()]);
    });

    it('should detect numerics', () => {
      formControl.setValue('abs2dd');
      expect(formControl.hasError('containsNumeric')).toEqual(false);
    });

    it('should not mistake symbols and letters for numerics', () => {
      formControl.setValue('abs+_!@#@#$^^*&().,?/dd');
      expect(formControl.hasError('containsNumeric')).toEqual(true);
    });
  });

  describe('containsLowerCase', () => {
    beforeEach(() => {
      formControl = new FormControl('', [containsLowerCase()]);
    });

    it('should detect lowerCase character', () => {
      formControl.setValue('1./2a');
      expect(formControl.hasError('containsLowercase')).toEqual(false);
    });

    it('should not mistake symbols and numerics for lowercase', () => {
      formControl.setValue('+_!@#@#$^^*&().,?/AB');
      expect(formControl.hasError('containsLowercase')).toEqual(true);
    });
  });

  describe('containsUpperCase', () => {
    beforeEach(() => {
      formControl = new FormControl('', [containsUpperCase()]);
    });

    it('should detect upperCase character', () => {
      formControl.setValue('1./2A');
      expect(formControl.hasError('containsUppercase')).toEqual(false);
    });

    it('should not mistake symbols and numerics for uppercase', () => {
      formControl.setValue('+_!@#@#$^^*&().,?/ab');
      expect(formControl.hasError('containsUppercase')).toEqual(true);
    });
  });

  describe('identical', () => {
    let formControl2: FormControl;
    beforeEach(() => {
      formControl2 = new FormControl('', []);
      formControl = new FormControl('', [identical(formControl2)]);
    });

    it('should see the difference between formValues where difference is length', () => {
      formControl2.setValue('1./2Ac');
      formControl.setValue('1./2A');
      expect(formControl.hasError('identical')).toEqual(true);
    });

    it('should see the difference between formValues where difference is changed character', () => {
      formControl2.setValue('1./2Ac');
      formControl.setValue('1./2Bc');
      expect(formControl.hasError('identical')).toEqual(true);
    });

    it('should notice identical values', () => {
      formControl2.setValue('+_!@#@#$^^*&().,?/ab');
      formControl.setValue('+_!@#@#$^^*&().,?/ab');
      expect(formControl.hasError('identical')).toEqual(false);
    });
  });
});
