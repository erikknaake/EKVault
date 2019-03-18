import { Injectable } from '@angular/core';
import {ObservableValue} from "../shared/ObservableValue";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public static readonly STORAGE_KEY = 'settings';
  public static readonly CAPITALS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  public static readonly LETTERS = 'abcdefghijklmnopqrstuvwxyz';
  public static readonly NUMBERS = '0123456789';
  public static readonly SYMBOLS = '+=.?/;!@#$%^&*()`~ <>_-\\';

  private static readonly DEFAULT_PASSWORD_LENGTH = 28;
  private static readonly DEFAULT_ALPHABET = SettingsService.CAPITALS + SettingsService.LETTERS + SettingsService.NUMBERS + SettingsService.SYMBOLS;

  private _passwordLength: ObservableValue<number> = new ObservableValue<number>();
  private _defaultUserName: ObservableValue<string> = new ObservableValue<string>();
  private _usernames: ObservableValue<string[]> = new ObservableValue<string[]>();
  private _alphabet: ObservableValue<string> = new ObservableValue<string>();

  constructor() {
    this.load();
    this._defaultUserName.value = "Erik";
    this._usernames.value = [this._defaultUserName.value, "Test"];
  } //TODO: make this better

  public save(): void {
    localStorage.setItem(SettingsService.STORAGE_KEY, JSON.stringify(this));
  }

  public load(): void {
    let loaded = JSON.parse(localStorage.getItem(SettingsService.STORAGE_KEY));
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
      this._passwordLength.value = loaded._passwordLength._value;
      this._alphabet.value = loaded._alphabet._value;
      this._defaultUserName.value = loaded._defaultUserName._value;
      this._usernames.value = loaded._usernames._value;
    }
    this.save();
  }

  public setDefault(): void {
    this._passwordLength.value = SettingsService.DEFAULT_PASSWORD_LENGTH;
    this._alphabet.value = SettingsService.DEFAULT_ALPHABET;
    this._defaultUserName.value = null;
    this._usernames.value = [];
  }

  get alphabet(): ObservableValue<string> {
    return this._alphabet;
  }

  set alphabetValue(value: string) {
    this._alphabet.value = value;
  }


  get passwordLength(): ObservableValue<number> {
    return this._passwordLength;
  }

  set passwordLengthValue(value: number) {
    this._passwordLength.value = value;
  }


  get usernames(): ObservableValue<string[]> {
    return this._usernames;
  }

  set usernamesValue(value: string[]) {
    this._usernames.value = value;
  }

  get defaultUserName(): ObservableValue<string> {
    return this._defaultUserName;
  }

  set defaultUserNameValue(value: string) {
    this._defaultUserName.value = value;
  }

}
