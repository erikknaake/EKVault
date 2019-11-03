import {async, TestBed} from '@angular/core/testing';

import {EditPasswordComponent} from './edit-password.component';
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {PasswordUIHelperService} from "../password-query-form/password-uihelper.service";
import {EditPasswordService} from "./edit-password.service";
import {PasswordFileService} from "../shared/password/password-file.service";
import {BrowserTestingModule} from "@angular/platform-browser/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {getTabs} from "../shared/Window";
import {MatDialogModule, MatSnackBarModule} from "@angular/material";

describe('EditPasswordComponent', () => {
  let component: EditPasswordComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPasswordComponent ],
      imports: [RouterTestingModule, FormsModule, MatDialogModule, MatSnackBarModule],
      providers: [
        BrowserTestingModule,
        EditPasswordService,
        PasswordUIHelperService,
        PasswordFileService,
        EditPasswordComponent,
        {provide: 'tabs', useFactory: getTabs}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    component = TestBed.get(EditPasswordComponent);
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
