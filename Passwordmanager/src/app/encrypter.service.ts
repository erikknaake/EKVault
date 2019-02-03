import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncrypterService {

  public static encrypt(data: string, key: string): string {
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse("It works"), key,
      {
        keySize: 128 / 8,
        iv: data,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
  }
}
