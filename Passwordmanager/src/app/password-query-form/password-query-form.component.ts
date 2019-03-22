import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../settings/settings.service";
import {PasswordUIHelperService} from "./password-uihelper.service";
import {NavigationEnd, Router, RouterEvent} from "@angular/router";

@Component({
  selector: 'app-password-query-form',
  templateUrl: './password-query-form.component.html',
  styleUrls: ['./password-query-form.component.scss']
})
export class PasswordQueryFormComponent implements OnInit {

  public passwordStrength: number;
  public passwordEditable: boolean;
  public showInputEditError: boolean;

  constructor(public readonly passwordUIHelper: PasswordUIHelperService,
              public settings: SettingsService,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.setPasswordFieldForURL();
        this.showInputEditError = false;
      }
    });
    this.setPasswordFieldForURL();
  }

  private setPasswordFieldForURL() {
    if (this.router.url === '/password/load') {
      this.passwordUIHelper.password = '';
      this.passwordEditable = false;
    } else if (this.router.url === '/password/new') {
      this.passwordUIHelper.password = this.passwordUIHelper.generatePassword();
      this.passwordEditable = true;
    }
  }


  public onStrengthChanged(strength: number) {
    // Timeout to not get a error about value changed after its evaluated
    setTimeout(() => {
      this.passwordStrength = strength;
    });
  }
}
