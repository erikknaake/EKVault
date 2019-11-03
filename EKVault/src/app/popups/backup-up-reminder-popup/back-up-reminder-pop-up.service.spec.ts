import { TestBed } from '@angular/core/testing';

import { BackUpReminderPopUpService } from './back-up-reminder-pop-up.service';
import {MatDialog} from "@angular/material";
import {BackupReminderPopUpComponent} from "./backup-reminder-pop-up.component";
import {MatConfigService} from "../snackbar/mat-config.service";
import {Observable} from "rxjs";

describe('BackUpReminderPopUpService', () => {
  let dialogSpy;
  let configSpy;
  const matConfig = {width: '25em', height: '30em', disableClose: true};
  let service: BackUpReminderPopUpService;

  beforeEach(() => {
    dialogSpy = jasmine.createSpyObj(['open']);
    let dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(new Observable());
    dialogSpy.open.and.returnValue(dialogRefSpy);

    TestBed.configureTestingModule({
      providers: [
        {provide: MatDialog, useValue: dialogSpy}
      ]
    });
    configSpy = spyOn(TestBed.get(MatConfigService), 'getMatConfig');
    configSpy.and.returnValue(matConfig);

    service = TestBed.get(BackUpReminderPopUpService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a dialog', () => {
    service.openBackupReminder();
    expect(dialogSpy.open).toHaveBeenCalledTimes(1);
    expect(dialogSpy.open).toHaveBeenCalledWith(BackupReminderPopUpComponent, matConfig);
  });
});
