import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMasterPasswordPopupComponent } from './new-master-password-popup.component';
import {MatSnackBarModule} from "@angular/material";

describe('NewPasswordComponent', () => {
  let component: NewMasterPasswordPopupComponent;
  let fixture: ComponentFixture<NewMasterPasswordPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      declarations: [ NewMasterPasswordPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMasterPasswordPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
