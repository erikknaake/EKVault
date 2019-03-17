import { Injectable } from '@angular/core';
import {ISettings} from "./ISettings";

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements ISettings{
  public static readonly STORAGE_KEY = 'settings';
  public static readonly CAPITALS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  public static readonly LETTERS = 'abcdefghijklmnopqrstuvwxyz';
  public static readonly NUMBERS = '0123456789';
  public static readonly SYMBOLS = '+=.?/;!@#$%^&*()`~ <>_-\\';

  private static readonly DEFAULT_PASSWORD_LENGTH = 28;
  private static readonly DEFAULT_ALPHABET = SettingsService.CAPITALS + SettingsService.LETTERS + SettingsService.NUMBERS + SettingsService.SYMBOLS;

  private _passwordLength: number;
  private _defaultUserName: string;
  private _usernames: string[];
  private _alphabet: string;

  constructor() {
    this.load();
    this._defaultUserName = "Erik";
    this.usernames = [this._defaultUserName, "Test"];
  } //TODO: make this better

  public save(): void {
    localStorage.setItem(SettingsService.STORAGE_KEY, JSON.stringify(this));
  }

  public load(): void {
    let loaded = JSON.parse(localStorage.getItem(SettingsService.STORAGE_KEY));
    console.log(loaded);
    if(loaded == null) {
      this.setDefault();
    } else {
      if(loaded._passwordLength == null) {
        loaded._passwordLength = SettingsService.DEFAULT_PASSWORD_LENGTH;
      }
      if(loaded._usernames == null) {
        loaded._usernames = [];
      }
      if(loaded._alphabet == null) {
        loaded._alphabet = SettingsService.DEFAULT_ALPHABET;
      }
      this._passwordLength = loaded._passwordLength;
      this._alphabet = loaded._alphabet;
      this._defaultUserName = loaded._defaultUserName;
      this._usernames = loaded._usernames;
    }
    this.save();
  }

  public setDefault(): void {
    this._passwordLength = SettingsService.DEFAULT_PASSWORD_LENGTH;
    this._alphabet = SettingsService.DEFAULT_ALPHABET;
    this._defaultUserName = null;
    this._usernames = [];
  }

  get alphabet(): string {
    return this._alphabet;
  }

  set alphabet(value: string) {
    this._alphabet = value;
  }


  get passwordLength(): number {
    return this._passwordLength;
  }

  set passwordLength(value: number) {
    this._passwordLength = value;
  }


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

}
