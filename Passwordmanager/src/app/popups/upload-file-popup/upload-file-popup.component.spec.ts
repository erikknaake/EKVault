import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFilePopupComponent } from './upload-file-popup.component';

describe('UploadFileComponent', () => {
  let component: UploadFilePopupComponent;
  let fixture: ComponentFixture<UploadFilePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFilePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFilePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
