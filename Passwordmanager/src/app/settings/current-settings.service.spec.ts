import { TestBed } from '@angular/core/testing';

import { CurrentSettingsService } from './current-settings.service';

describe('CurrentSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentSettingsService = TestBed.get(CurrentSettingsService);
    expect(service).toBeTruthy();
  });
});
