import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-authenticate-popup',
  templateUrl: './authenticate-popup.component.html',
  styleUrls: ['./authenticate-popup.component.scss']
})
export class AuthenticatePopupComponent implements OnInit {

  private form: FormGroup;
  constructor(private readonly dialogRef: MatDialogRef<AuthenticatePopupComponent>, private readonly formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      masterPassword: ''
    });
  }

  public submit(form): void {
    console.log(form.value.masterPassword);
    this.dialogRef.close(form.value.masterPassword);
  }
}
