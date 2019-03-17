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

  constructor(public readonly passwordUIHelper: PasswordUIHelperService,
              public settings: SettingsService,
              private readonly router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if(event instanceof NavigationEnd) {
        if(this.router.url === '/password/load') {
          this.passwordUIHelper.password = '';
        } else if (this.router.url === '/password/new') {
          this.passwordUIHelper.password = this.passwordUIHelper.generatePassword();
        }
      }
    })
  }

  public onStrengthChanged(strength: number) {
    this.passwordStrength = strength;
  }

}
