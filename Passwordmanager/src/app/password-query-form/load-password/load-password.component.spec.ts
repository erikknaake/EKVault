import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPasswordComponent } from './load-password.component';

describe('LoadPasswordComponent', () => {
  let component: LoadPasswordComponent;
  let fixture: ComponentFixture<LoadPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
