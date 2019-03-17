import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAlphabetComponent } from './change-alphabet.component';

describe('GenerateAlphabetComponent', () => {
  let component: ChangeAlphabetComponent;
  let fixture: ComponentFixture<ChangeAlphabetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeAlphabetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAlphabetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
