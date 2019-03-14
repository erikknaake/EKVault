import { TestBed } from '@angular/core/testing';

import { RequestedFileExtensionService } from './requested-file-extension.service';

describe('RequestedFileExtensionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestedFileExtensionService = TestBed.get(RequestedFileExtensionService);
    expect(service).toBeTruthy();
  });
});
