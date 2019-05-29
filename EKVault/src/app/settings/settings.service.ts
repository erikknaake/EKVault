import {Inject, Injectable, Renderer2} from '@angular/core';
import {ObservableValue} from "../shared/ObservableValue";
import {ISettings} from "./ISettings";
import {DOCUMENT} from "@angular/common";
import {ArrayHelper} from "../shared/ArrayHelper";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public static readonly STORAGE_KEY = 'settings';
  public static readonly CAPITALS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  public static readonly LETTERS = 'abcdefghijklmnopqrstuvwxyz';
  public static readonly NUMBERS = '0123456789';
  public static readonly SYMBOLS = '+=.?/;!@#$%^&*()`~ <>_-\\';
  public static readonly DEFAULT_IS_DARK_THEME = true;
  public static readonly DEFAULT_USERNAMES = [];
  public static readonly DEFAULT_DEFAULT_USERNAME = null;
  public static readonly DEFAULT_REMIND_BACKUP_TIME = 30;
  public static readonly DEFAULT_DO_AUTO_BACKUP = false;
  public static readonly DEFAULT_DO_BACKUP_SETTINGS = true;

  private static readonly DEFAULT_PASSWORD_LENGTH = 28;
  private static readonly DEFAULT_ALPHABET = SettingsService.CAPITALS
    + SettingsService.LETTERS
    + SettingsService.NUMBERS
    + SettingsService.SYMBOLS;

  private _passwordLength: ObservableValue<number> = new ObservableValue<number>();
  private _defaultUsername: ObservableValue<string> = new ObservableValue<string>();
  private _usernames: ObservableValue<string[]> = new ObservableValue<string[]>();
  private _alphabet: ObservableValue<string> = new ObservableValue<string>();
  private _isDarkTheme: ObservableValue<boolean> = new ObservableValue<boolean>();
  private _remindBackUpTime: ObservableValue<number> = new ObservableValue<number>(); // How often to remind to make backups in days, where -1 is never and -2 is every change
  private _doAutoBackUp: ObservableValue<boolean> = new ObservableValue<boolean>();
  private _doBackupSettings: ObservableValue<boolean> = new ObservableValue<boolean>();

  constructor() {
    this.load();
  }

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
      usernames: this.usernames.value,
      isDarkTheme: this.isDarkTheme.value,
      remindBackUpTime: this.remindBackUpTime.value,
      doAutoBackUp: this.doAutoBackUp.value,
      doBackupSettings: this.doBackupSettings.value
    };
    return JSON.stringify(pureObject);
  }

  public restoreJSON(json: string): void {
    const loaded: ISettings = JSON.parse(json);
    if (loaded != null) {
      this.passwordLengthValue = loaded.passwordLength;
      this.alphabetValue = loaded.alphabet;
      this.defaultUsernameValue = loaded.defaultUsername;
      this.usernamesValue = loaded.usernames;
      this.isDarkThemeValue = loaded.isDarkTheme;
      this.remindBackUpTimeValue = loaded.remindBackUpTime;
      this.doAutoBackUpValue = loaded.doAutoBackUp;
      this.doBackupSettingsValue = loaded.doBackupSettings;
    }
    this.setUnsetToDefault();
    this.save();
  }

  public setDefault(): void {
    this.passwordLengthValue = SettingsService.DEFAULT_PASSWORD_LENGTH;
    this.alphabetValue = SettingsService.DEFAULT_ALPHABET;
    this.defaultUsernameValue = SettingsService.DEFAULT_DEFAULT_USERNAME;
    this.usernamesValue = SettingsService.DEFAULT_USERNAMES;
    this.isDarkThemeValue = SettingsService.DEFAULT_IS_DARK_THEME;
    this.remindBackUpTimeValue = SettingsService.DEFAULT_REMIND_BACKUP_TIME;
    this.doAutoBackUpValue = SettingsService.DEFAULT_DO_AUTO_BACKUP;
    this.doBackupSettingsValue = SettingsService.DEFAULT_DO_BACKUP_SETTINGS;
  }

  public setUnsetToDefault(): void {
    if(this.passwordLength.value == null)
      this.passwordLengthValue = SettingsService.DEFAULT_PASSWORD_LENGTH;
    if(this.alphabet.value == null)
      this.alphabetValue = SettingsService.DEFAULT_ALPHABET;
    if(this.defaultUsername.value == null)
      this.defaultUsernameValue = SettingsService.DEFAULT_DEFAULT_USERNAME;
    if(this.usernames.value == null)
      this.usernamesValue = SettingsService.DEFAULT_USERNAMES;
    if(this.isDarkTheme.value == null)
      this.isDarkThemeValue = SettingsService.DEFAULT_IS_DARK_THEME;
    if(this.remindBackUpTime.value == null)
      this.remindBackUpTimeValue = SettingsService.DEFAULT_REMIND_BACKUP_TIME;
    if(this.doAutoBackUp.value == null)
      this.doAutoBackUpValue = SettingsService.DEFAULT_DO_AUTO_BACKUP;
    if(this.doBackupSettings.value == null)
      this.doBackupSettingsValue = SettingsService.DEFAULT_DO_BACKUP_SETTINGS;
  }


  public changeUsername(oldUsername: string, newUsername: string): void {
    this._usernames.value[this._usernames.value.indexOf(oldUsername)] = newUsername;
    this.save();
  }

  public addUsername(username: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      // The username already exists
      if (this.usernames.value.includes(username)) {
        reject('username');
      } else {
        this.usernames.value.push(username);
        // Also set as default if its the first ever username
        if (this.defaultUsername.value == null) {
          this.defaultUsernameValue = username;
        }
        this.save();
        resolve(true);
      }
    });
  }

  public deleteUsername(username: string): void {
    this.usernames.value = ArrayHelper.removeItem(this.usernames.value, username);
    this.save();
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

  set defaultUsernameValue(value: string) {
    this._defaultUsername.value = value;
  }

  get isDarkTheme(): ObservableValue<boolean> {
    return this._isDarkTheme;
  }

  set isDarkThemeValue(value: boolean) {
    this._isDarkTheme.value = value;
    if (value) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  get remindBackUpTime(): ObservableValue<number> {
    return this._remindBackUpTime;
  }

  set remindBackUpTimeValue(value: number) {
    this._remindBackUpTime.value = value;
  }

  get doAutoBackUp(): ObservableValue<boolean> {
    return this._doAutoBackUp;
  }

  set doAutoBackUpValue(value: boolean) {
    this._doAutoBackUp.value = value;
  }

  get doBackupSettings(): ObservableValue<boolean> {
    return this._doBackupSettings;
  }

  set doBackupSettingsValue(value: boolean) {
    this._doBackupSettings.value = value;
  }
}
