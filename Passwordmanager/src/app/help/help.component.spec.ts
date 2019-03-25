import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HelpComponent} from './help.component';
import {BrowserTestingModule} from "@angular/platform-browser/testing";

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpComponent ],
      imports: [BrowserTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   //   expect(component).toBeTruthy();
  //   // });
});
