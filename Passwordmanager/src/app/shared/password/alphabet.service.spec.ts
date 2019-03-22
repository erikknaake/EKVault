import { TestBed } from '@angular/core/testing';

import { AlphabetService } from './alphabet.service';

describe('AlphabetService', () => {
  let jsonSpy;
  let localStorageSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({

    });
    jsonSpy = spyOn(JSON, 'parse');
    jsonSpy.and.returnValue({alphabet: 'abcABC123'});
    localStorageSpy = spyOn(localStorage, 'getItem');
    localStorageSpy.and.returnValue("{alphabet: 'abcABC123'}");
  });

  it('Should get the alphabet from localStorage', () => {
    AlphabetService.getAlphabet();
    expect(localStorageSpy).toHaveBeenCalledTimes(1);
    expect(localStorageSpy).toHaveBeenCalledWith('settings');
    expect(jsonSpy).toHaveBeenCalledTimes(1);
    expect(jsonSpy).toHaveBeenCalledWith("{alphabet: 'abcABC123'}");
  })
});
