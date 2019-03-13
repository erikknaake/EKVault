import { TestBed } from '@angular/core/testing';

import { NewMasterPasswordService } from './new-master-password.service';

describe('NewMasterPasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewMasterPasswordService = TestBed.get(NewMasterPasswordService);
    expect(service).toBeTruthy();
  });
});
