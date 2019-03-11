import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentSettingsService {
  get passwordLength(): number {
    return this._passwordLength;
  }

  private _passwordLength: number;
  constructor() { this._passwordLength = 20}
}
