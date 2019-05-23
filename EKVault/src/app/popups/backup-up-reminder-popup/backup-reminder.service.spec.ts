import { TestBed } from '@angular/core/testing';

import { BackupReminderService } from './backup-reminder.service';

describe('BackupReminderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackupReminderService = TestBed.get(BackupReminderService);
    expect(service).toBeTruthy();
  });
});
