import { TestBed } from '@angular/core/testing';

import { CSPRNGService } from './csprng.service';
import {AlphabetService} from "../shared/password/alphabet.service";

describe('CSPRNGService', () => {
  let alphabetSpy;

  beforeEach(() => {
    alphabetSpy = spyOn(AlphabetService, 'getAlphabet');
    alphabetSpy.and.returnValue('ABCabc123');
    TestBed.configureTestingModule({
    });
  });

  it('should output correct length', () => {
    const randomString = CSPRNGService.generateCSPRN(21);
    expect(randomString.length).toEqual(21);
    expect(alphabetSpy).toHaveBeenCalledTimes(1);
  });

  it('should output correct length', () => {
    const randomString = CSPRNGService.generateCSPRN(20);
    expect(randomString.length).toEqual(20);
    expect(alphabetSpy).toHaveBeenCalledTimes(1);
  });
});
