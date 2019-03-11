import { TestBed } from '@angular/core/testing';

import { PasswordFileService } from './password-file.service';

describe('PasswordFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordFileService = TestBed.get(PasswordFileService);
    expect(service).toBeTruthy();
  });
});
