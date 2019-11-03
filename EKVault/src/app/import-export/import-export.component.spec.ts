import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImportExportComponent} from './import-export.component';
import {MatExpansionModule} from "@angular/material";
import {ImportExportService} from "./import-export.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ImportExportComponent', () => {
  let component: ImportExportComponent;
  let importExportSpy;

  beforeEach(async(() => {
    importExportSpy = jasmine.createSpyObj('ImportExportService', ['importSettings', 'importPasswords', 'exportSettings', 'exportPasswords']);
    TestBed.configureTestingModule({
      declarations: [ ImportExportComponent ],
      providers: [
        {provide: ImportExportService, useValue: importExportSpy},
        ImportExportComponent
      ],
      imports: [MatExpansionModule, BrowserAnimationsModule]
    })
    .compileComponents();

    component = TestBed.get(ImportExportComponent)
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
