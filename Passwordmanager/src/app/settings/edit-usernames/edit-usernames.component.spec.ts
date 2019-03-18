import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsernamesComponent } from './edit-usernames.component';

describe('EditUsernamesComponent', () => {
  let component: EditUsernamesComponent;
  let fixture: ComponentFixture<EditUsernamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUsernamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUsernamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
