import { Injectable } from '@angular/core';
import {ISettings} from "./ISettings";

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements ISettings{
  private static readonly PASSWORD_LENGTH_KEY = 'passwordLength';
  private static readonly DEFAULT_PASSWORD_LENGTH = 20;

  get passwordLength(): number {
    if(this._passwordLength == null) {
      this.passwordLength = parseInt(localStorage.getItem(SettingsService.PASSWORD_LENGTH_KEY), 10);
      if(this._passwordLength == null) {
        this.passwordLength = SettingsService.DEFAULT_PASSWORD_LENGTH;
      }
    }
    return this._passwordLength;
  }

  set passwordLength(value: number) {
    localStorage.setItem(SettingsService.PASSWORD_LENGTH_KEY, value.toString());
    this._passwordLength = value;
  }
  private _passwordLength: number;
  private _defaultUserName: string;
  private _usernames: string[];

  get usernames(): string[] {
    return this._usernames;
  }

  set usernames(value: string[]) {
    this._usernames = value;
  }

  get defaultUserName(): string {
    return this._defaultUserName;
  }

  set defaultUserName(value: string) {
    this._defaultUserName = value;
  }

  constructor() {
    this._defaultUserName = "Erik";
    this.usernames = [this._defaultUserName, "Test"]}
}
