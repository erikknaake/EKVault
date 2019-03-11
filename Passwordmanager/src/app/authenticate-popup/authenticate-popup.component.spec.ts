import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatePopupComponent } from './authenticate-popup.component';

describe('AuthenticatePopupComponent', () => {
  let component: AuthenticatePopupComponent;
  let fixture: ComponentFixture<AuthenticatePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticatePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
