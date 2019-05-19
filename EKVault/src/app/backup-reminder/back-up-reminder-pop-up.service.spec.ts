import { TestBed } from '@angular/core/testing';

import { BackUpReminderPopUpService } from './back-up-reminder-pop-up.service';

describe('BackUpReminderPopUpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackUpReminderPopUpService = TestBed.get(BackUpReminderPopUpService);
    expect(service).toBeTruthy();
  });
});
