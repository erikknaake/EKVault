import { TestBed } from '@angular/core/testing';

import { PasswordRequirementsService } from './password-requirements.service';

describe('PasswordRequirementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordRequirementsService = TestBed.get(PasswordRequirementsService);
    expect(service).toBeTruthy();
  });
});
