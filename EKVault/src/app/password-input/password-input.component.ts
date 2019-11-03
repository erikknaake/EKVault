import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {PasswordFormControlFactory} from "../shared/validators/passwordFormControlFactory";

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent implements OnInit {
  @Input()
  public placeholder: string;

  @Input()
  public control: FormControl;

  @Input()
  public type = 'password';

  @Input()
  public value = '';

  constructor(public readonly passwordControlFormFactory: PasswordFormControlFactory) { }

  ngOnInit() {
    this.control.setValue(this.value);
  }

}
