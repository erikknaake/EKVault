import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupReminderPopUpComponent } from './backup-reminder-pop-up.component';
import {ImportExportComponent} from "../../import-export/import-export.component";
import {MatDialogRef, MatExpansionModule} from "@angular/material";

describe('BackupReminderPopUpComponent', () => {
  let component: BackupReminderPopUpComponent;
  let dialogRefSpy;

  beforeEach(async(() => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    TestBed.configureTestingModule({
      declarations: [ BackupReminderPopUpComponent, ImportExportComponent ],
      providers: [
        {provide: MatDialogRef, useValue: dialogRefSpy},
        BackupReminderPopUpComponent
      ],
      imports: [MatExpansionModule]
    }).compileComponents();

    component = TestBed.get(BackupReminderPopUpComponent);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
