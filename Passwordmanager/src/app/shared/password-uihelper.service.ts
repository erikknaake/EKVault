import {ApplicationRef, Injectable, OnInit} from '@angular/core';
import {Clipboard} from "ts-clipboard";
import {CurrentSettingsService} from "../settings/current-settings.service";
import {DomainService} from "./domain.service";

@Injectable({
  providedIn: 'root'
})
export class PasswordUIHelperService implements OnInit{


  public static readonly VISIBLE_PASSWORD_VISIBILITY = 'visibility';
  public static readonly VISIBLE_PASSWORD_INPUT_TYPE = 'text';
  public static readonly HIDDEN_PASSWORD_VISIBILITY = 'visibility_off';
  public static readonly HIDDEN_PASSWORD_INPUT_TYPE = 'password';

  private _selectedUsername: string;
  private _password: string;
  private _passwordVisibility: string;
  private _passwordInputType: string;
  private _domain: string;


  get selectedUsername(): string {
    return this._selectedUsername;
  }

  set selectedUsername(value: string) {
    this._selectedUsername = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get passwordVisibility(): string {
    return this._passwordVisibility;
  }

  set passwordVisibility(value: string) {
    this._passwordVisibility = value;
  }

  get passwordInputType(): string {
    return this._passwordInputType;
  }

  set passwordInputType(value: string) {
    this._passwordInputType = value;
  }

  get domain(): string {
    return this._domain;
  }

  set domain(value: string) {
    this._domain = value;
  }

  constructor(private readonly settings: CurrentSettingsService,
              private readonly domainService: DomainService) {
    //Init passwordVisibility in constructor so depended mat-icons are visible when first loaded in
    this._passwordVisibility = PasswordUIHelperService.HIDDEN_PASSWORD_VISIBILITY;
    // Init selectedUsername in constructor so select input can have preselected defaults
    this._selectedUsername = this.settings.defaultUserName;
    // Init selectedUsername in constructor so text inputs can have preset defaults
    this.domainService.getDomain().then((domain) => {
      this._domain = domain;
    });
  }

  ngOnInit() {
    this._passwordInputType = PasswordUIHelperService.HIDDEN_PASSWORD_INPUT_TYPE;
    this._password = '';
  }

  public getUsernames(): string[] {
    return this.settings.usernames;
  }

  public togglePasswordVisibility(): void {
    if (this._passwordInputType === PasswordUIHelperService.HIDDEN_PASSWORD_INPUT_TYPE) {
      this._passwordInputType = PasswordUIHelperService.VISIBLE_PASSWORD_INPUT_TYPE;
      this._passwordVisibility = PasswordUIHelperService.VISIBLE_PASSWORD_VISIBILITY;
    } else {
      this._passwordInputType = PasswordUIHelperService.HIDDEN_PASSWORD_INPUT_TYPE;
      this._passwordVisibility = PasswordUIHelperService.HIDDEN_PASSWORD_VISIBILITY;
    }
  }

  public copyPassword(): void {
    Clipboard.copy(this._password);
  }
}
