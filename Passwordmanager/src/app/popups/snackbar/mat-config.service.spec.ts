import { TestBed } from '@angular/core/testing';

import { MatConfigService } from './mat-config.service';

describe('MatConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatConfigService = TestBed.get(MatConfigService);
    expect(service).toBeTruthy();
  });
});
