import { Component, OnInit } from '@angular/core';
import {CSPRNGService} from "../Crypto/csprng.service";
import {CurrentSettingsService} from "../current-settings.service";
import {MatSnackBar} from "@angular/material";
import {Clipboard} from 'ts-clipboard';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  constructor(private readonly settings: CurrentSettingsService, private readonly snackbar: MatSnackBar) { }
  private generated: string;

  ngOnInit() {
    this.generated = '';
  }

  public newPassword(): void {
    this.generated = CSPRNGService.generateCSPRNG(this.settings.passwordLength);
    this.snackbar.open('Password generated', 'Copy to clipboard', {duration: 5000}).onAction().subscribe(() => {
      Clipboard.copy(this.generated);
    });
  }
}
