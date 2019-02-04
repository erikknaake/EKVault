import { TestBed } from '@angular/core/testing';

import { CryptoRandomService } from './crypto-random.service';

describe('CryptoRandomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CryptoRandomService = TestBed.get(CryptoRandomService);
    expect(service).toBeTruthy();
  });
});
