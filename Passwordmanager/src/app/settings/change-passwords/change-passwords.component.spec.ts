import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordsComponent } from './change-passwords.component';

describe('ChangePasswordsComponent', () => {
  let component: ChangePasswordsComponent;
  let fixture: ComponentFixture<ChangePasswordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
