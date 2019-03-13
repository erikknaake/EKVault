import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentSettingsService {
  get passwordLength(): number {
    return this._passwordLength;
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

  constructor() { this._passwordLength = 20; this._defaultUserName = "Erik"; this.usernames = [this._defaultUserName, "Test"]}
}
