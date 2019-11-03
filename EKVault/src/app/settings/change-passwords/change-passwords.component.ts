import {Component, Input, OnInit} from '@angular/core';
import {SettingsService} from "../settings.service";
import {PasswordFileService} from "../../shared/password/password-file.service";

@Component({
  selector: 'app-change-passwords',
  templateUrl: './change-passwords.component.html',
  styleUrls: ['./change-passwords.component.scss']
})
export class ChangePasswordsComponent implements OnInit {
  @Input() domain: string;
  @Input() username: string;

  constructor(private readonly settings: SettingsService,
              private readonly passwordFile: PasswordFileService) { }

  ngOnInit() {
  }

}
