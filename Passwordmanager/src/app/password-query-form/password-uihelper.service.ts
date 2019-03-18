import {Injectable, OnInit} from '@angular/core';
import {Clipboard} from "ts-clipboard";
import {SettingsService} from "../settings/settings.service";
import {DomainService} from "../shared/domain.service";
import {CSPRNGService} from "../Crypto/csprng.service";

@Injectable({
  providedIn: 'root'
})
export class PasswordUIHelperService implements OnInit {


  public static readonly VISIBLE_PASSWORD_VISIBILITY = 'visibility_off';
  public static readonly VISIBLE_PASSWORD_INPUT_TYPE = 'text';
  public static readonly HIDDEN_PASSWORD_VISIBILITY = 'visibility';
  public static readonly HIDDEN_PASSWORD_INPUT_TYPE = 'password';

  private _selectedUsername: string;
  private _password: string;
  private _passwordVisibility: string;
  private _passwordInputType: string;
  private _domain: string;
  private _title: string;
  private _passwordLabel: string;

  get passwordLabel(): string {
    return this._passwordLabel;
  }

  set passwordLabel(value: string) {
    this._passwordLabel = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

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

  constructor(private readonly settings: SettingsService,
              private readonly domainService: DomainService) {
    // Init selectedUsername in constructor so text inputs can have preset defaults
    this.domainService.getDomain().then((domain) => {
      this._domain = domain;
    });
    //Init passwordVisibility in constructor so depended mat-icons are visible when first loaded in
    this._passwordVisibility = PasswordUIHelperService.HIDDEN_PASSWORD_VISIBILITY;
    // Init selectedUsername in constructor so select input can have preselected defaults
    this._selectedUsername = this.settings.defaultUserName.value;
    this._passwordInputType = PasswordUIHelperService.HIDDEN_PASSWORD_INPUT_TYPE;
    this._password = '';
  }

  ngOnInit() {

  }

  public getUsernames(): string[] {
    return this.settings.usernames.value;
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

  public generatePassword(): string {
    return CSPRNGService.generateCSPRN(this.settings.passwordLength.value);
  }
}
