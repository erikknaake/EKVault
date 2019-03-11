export class PasswordDTO {
  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get domain(): string {
    return this._domain;
  }

  set domain(value: string) {
    this._domain = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  private _password: string;
  private _domain: string;
  private _username: string;

  constructor(domain: string, password: string, username: string) {
    this.domain = domain;
    this.password = password;
    this.username = username;
  }

  public toString() {
    return JSON.stringify(this);
  }

  public static fromString(data: string) {
    const dataJSON = JSON.parse(data);
    return new PasswordDTO(dataJSON['password'], dataJSON['domain'], dataJSON['username']);;
  }
}
