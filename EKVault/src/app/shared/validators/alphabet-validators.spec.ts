import {FormControl} from "@angular/forms";
import {noDoubleCharacters, noJSON} from "./alphabet-validators";

describe('Alphabet validators', () => {
  let formControl: FormControl;

  describe('noJSON', () => {
    beforeEach(() => {
      formControl = new FormControl('', [noJSON()]);
    });

    it('should detect no json', () => {
      formControl.setValue('aBbs+_!@#@#$^^*&().?/dd');
      expect(formControl.hasError('noJSON')).toEqual(false);
    });

    it('should detect json (:)', () => {
      formControl.setValue('aBbs+_!:@#@#$^^*&().?/dd');
      expect(formControl.hasError('noJSON')).toEqual(true);
    });

    it('should detect json (,)', () => {
      formControl.setValue('aBbs+_!,@#@#$^^*&().?/dd');
      expect(formControl.hasError('noJSON')).toEqual(true);
    });
  });

  describe('noDoubleCharacters', () => {
    beforeEach(() => {
      formControl = new FormControl('', [noDoubleCharacters()]);
    });

    it('should detect no double characters', () => {
      formControl.setValue('avc123#@,.></?');
      expect(formControl.hasError('noDoubleCharacters')).toEqual(false);
    });

    it('should detect doubleCharacters (a)', () => {
      formControl.setValue('aavc123#@,.></?');
      expect(formControl.hasError('noDoubleCharacters')).toEqual(true);
    });

    it('should detect doubleCharacters (#)', () => {
      formControl.setValue('avc123#@,.></?#');
      expect(formControl.hasError('noDoubleCharacters')).toEqual(true);
    });
  });
});
