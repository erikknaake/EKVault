import { Injectable } from '@angular/core';
declare let require;
const CRYPTOJS = require("crypto-js");
@Injectable({
  providedIn: 'root'
})
export class EncrypterService {

  constructor() { }

  public static encrypt(data: string, key: string): string {
    return CRYPTOJS.AES.encrypt(data, key).toString();
  }

  public static decrypt(data:string, key: string): string {
    return CRYPTOJS.AES.decrypt(data, key).toString(CRYPTOJS.enc.Utf8);
  }
}
