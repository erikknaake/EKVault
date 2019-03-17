import { TestBed } from '@angular/core/testing';

import { CSPRNGService } from './csprng.service';

describe('CSPRNGService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CSPRNGService = TestBed.get(CSPRNGService);
    expect(service).toBeTruthy();
  });

  it('should output correct length', () => {
    const randomString = CSPRNGService.generateCSPRN(21);
    expect(randomString.length).toEqual(21)
  });

  it('should output correct length', () => {
    const randomString = CSPRNGService.generateCSPRN(20);
    expect(randomString.length).toEqual(20)
  });
});
