import {TestBed} from '@angular/core/testing';

import {EditPasswordService} from './edit-password.service';

describe('EditPasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({
  }));

  it('should be created', () => {
    const service: EditPasswordService = TestBed.get(EditPasswordService);
    expect(service).toBeTruthy();
  });
});
