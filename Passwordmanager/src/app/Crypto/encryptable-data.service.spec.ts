import { TestBed } from '@angular/core/testing';

import { EncryptableDataService } from './encryptable-data.service';

describe('EncryptableDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncryptableDataService = TestBed.get(EncryptableDataService);
    expect(service).toBeTruthy();
  });
});
