import {TestBed} from "@angular/core/testing";
import {NavigationComponent} from "./navigation.component";
import {RouterTestingModule} from "@angular/router/testing";
import {BackupReminderService} from "../popups/backup-up-reminder-popup/backup-reminder.service";
import {NavigationEnd, Router} from "@angular/router";
import {SettingsComponent} from "../settings/settings.component";

describe('NavigationComponent', () => {

  let component;
  let backupReminderSpy;
  let routerSpy;

  beforeEach(() => {
    backupReminderSpy = jasmine.createSpyObj('BackupReminderService', ['tryBackUpOrReminder']);
    TestBed.configureTestingModule({
      providers: [
        NavigationComponent,
        {provide: BackupReminderService, useValue: backupReminderSpy},
      ],
      imports: [
        RouterTestingModule
      ]
    });
    component = TestBed.get(NavigationComponent);
    routerSpy = spyOn(TestBed.get(Router).events, 'subscribe');
    routerSpy.and.callFake((fn) => {
      fn(new NavigationEnd(1, '', ''));
    });
  });

  it('should init', () => {
    expect(component).toBeTruthy();
  });

  it('should check if it needs to backup', () => {
    component.ngOnInit();
    TestBed.get(Router).navigate(['']);
    expect(backupReminderSpy.tryBackUpOrReminder).toHaveBeenCalledTimes(1);
  });
});
