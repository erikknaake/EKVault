import { Component, OnInit } from '@angular/core';
import {CurrentSettingsService} from "../current-settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private readonly settingsService: CurrentSettingsService) { }

  ngOnInit() {
  }

  public getPasswordLength(): number {
    return this.settingsService.passwordLength;
  }
}
