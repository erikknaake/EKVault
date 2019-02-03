import { TestBed } from '@angular/core/testing';

import { EncrypterService } from './encrypter.service';

describe('EncrypterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncrypterService = TestBed.get(EncrypterService);
    expect(service).toBeTruthy();
  });
});
