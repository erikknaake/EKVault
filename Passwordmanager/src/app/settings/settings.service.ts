import { Injectable } from '@angular/core';
import {ObservableValue} from "../shared/ObservableValue";
import {ISettings} from "./ISettings";

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
  private _defaultUsername: ObservableValue<string> = new ObservableValue<string>();
  private _usernames: ObservableValue<string[]> = new ObservableValue<string[]>();
  private _alphabet: ObservableValue<string> = new ObservableValue<string>();

  constructor() {
    this.load();
    this._defaultUsername.value = "Erik";
    this._usernames.value = [this._defaultUsername.value, "Test"];
  } //TODO: make this better

  public save(): void {
    localStorage.setItem(SettingsService.STORAGE_KEY, this.toJSON());
  }

  public load(): void {
    this.restoreJSON(localStorage.getItem(SettingsService.STORAGE_KEY));
  }

  public toJSON(): string {
    const pureObject: ISettings = {
      alphabet: this.alphabet.value,
      passwordLength: this.passwordLength.value,
      defaultUsername: this.defaultUsername.value,
      usernames: this.usernames.value
    };
    return JSON.stringify(pureObject);
  }

  public restoreJSON(json: string): void {
    const loaded: ISettings = JSON.parse(json);
    if(loaded == null) {
      this.setDefault();
    } else {
      if(loaded.passwordLength == null) {
        loaded.passwordLength = SettingsService.DEFAULT_PASSWORD_LENGTH;
      }
      if(loaded.usernames == null) {
        loaded.usernames = [];
      }
      if(loaded.alphabet == null) {
        loaded.alphabet = SettingsService.DEFAULT_ALPHABET;
      }
      this._passwordLength.value = loaded.passwordLength;
      this._alphabet.value = loaded.alphabet;
      this._defaultUsername.value = loaded.defaultUsername;
      this._usernames.value = loaded.usernames;
    }
    this.save();
  }

  public setDefault(): void {
    this._passwordLength.value = SettingsService.DEFAULT_PASSWORD_LENGTH;
    this._alphabet.value = SettingsService.DEFAULT_ALPHABET;
    this._defaultUsername.value = null;
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

  get defaultUsername(): ObservableValue<string> {
    return this._defaultUsername;
  }

  set defaultUserNameValue(value: string) {
    this._defaultUsername.value = value;
  }

}
