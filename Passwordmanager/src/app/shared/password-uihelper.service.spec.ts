import { TestBed } from '@angular/core/testing';

import { PasswordUIHelperService } from './password-uihelper.service';

describe('PasswordUIHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordUIHelperService = TestBed.get(PasswordUIHelperService);
    expect(service).toBeTruthy();
  });
});
