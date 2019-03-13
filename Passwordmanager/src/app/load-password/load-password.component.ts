import {Component, OnInit} from '@angular/core';
import {PasswordUIHelperService} from "../shared/password-uihelper.service";
import {PasswordFileService} from "../shared/password-file.service";
import {CurrentSettingsService} from "../settings/current-settings.service";

@Component({
  selector: 'app-load-password',
  templateUrl: './load-password.component.html',
  styleUrls: ['./load-password.component.scss']
})
export class LoadPasswordComponent implements OnInit {

  constructor(private readonly passwordFile: PasswordFileService,
              public readonly passwordUIHelper: PasswordUIHelperService,
              public readonly settings: CurrentSettingsService) { }

  ngOnInit() {
    this.passwordUIHelper.password = '';
  }

  public loadPassword() {
    // TODO:
  }
}
