import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupReminderPopUpComponent } from './backup-reminder-pop-up.component';

describe('BackupReminderPopUpComponent', () => {
  let component: BackupReminderPopUpComponent;
  let fixture: ComponentFixture<BackupReminderPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupReminderPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupReminderPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
