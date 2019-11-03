import {IPassword} from "./IPassword";

export class PasswordDTO implements IPassword {

  public password: string;
  public domain: string;
  public username: string;

  constructor(domain: string, password: string, username: string) {
    this.domain = domain;
    this.password = password;
    this.username = username;
  }

  public static fromString(data: string) {
    const dataJSON = JSON.parse(data);
    return new PasswordDTO(dataJSON['password'], dataJSON['domain'], dataJSON['username']);
  }

  public toString() {
    return JSON.stringify(this);
  }

}
