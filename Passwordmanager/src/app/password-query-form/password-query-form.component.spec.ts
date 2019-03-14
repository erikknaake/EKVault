import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordQueryFormComponent } from './password-query-form.component';

describe('PasswordQueryFormComponent', () => {
  let component: PasswordQueryFormComponent;
  let fixture: ComponentFixture<PasswordQueryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordQueryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordQueryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
