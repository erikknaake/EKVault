import { TestBed } from '@angular/core/testing';

import { EncryaptableDataService } from './encryaptable-data.service';

describe('EncryaptableDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncryaptableDataService = TestBed.get(EncryaptableDataService);
    expect(service).toBeTruthy();
  });
});
