import {Injectable} from '@angular/core';
import {EncrypterService} from "./encrypter.service";
import {CSPRNGService} from "./csprng.service";

@Injectable({
  providedIn: 'root'
})
export class EncryptableDataService {

  private _padding: string;
  private _data: string;
  private _paddingSize: number;
  private readonly MAX_PADDING_SIZE: number = 32;
  private readonly PADDING_SIZE_IDENTIFIER_NUM_DIGITS: number = 3;
  private readonly RADIX: number = 10;

  constructor() {
    this.data = '';
  }

  /**
   * Creates an instance of Encryptable data by decrypting a string with the given key
   * @param encryptableData - string in the format gotten from @see encrypt
   * @param key - key to decrypt the string with
   */
  public static fromString(encryptableData: string, key: string): EncryptableDataService {
    const result: EncryptableDataService = new EncryptableDataService();
    result._paddingSize = parseInt(encryptableData.substr(0, result.PADDING_SIZE_IDENTIFIER_NUM_DIGITS), result.RADIX);
    const decrypted: string = EncrypterService.decrypt(
      encryptableData.substr(result.PADDING_SIZE_IDENTIFIER_NUM_DIGITS, encryptableData.length),
      key);
    result._data = decrypted.substr(0, decrypted.length - result._paddingSize);
    if (result._data === "") {
      result._data = "[]";
    }
    result.updatePadding();
    return result;
  }

  public static newInstance(): EncryptableDataService {
    return new EncryptableDataService();
  }

  get data(): string {
    return this._data;
  }

  set data(value: string) {
    this._data = value;
    this.updatePadding();
  }

  get paddingSize(): number {
    return this._paddingSize;
  }

  get padding(): string {
    return this._padding;
  }

  private updatePadding(): void {
    this._paddingSize = this.MAX_PADDING_SIZE - (this.data.length % this.MAX_PADDING_SIZE);
    this._padding = CSPRNGService.generateCSPRN(this.paddingSize);
  }

  public toString(): string {
    return this.data + this.padding;
  }

  /**
   * Encrypts the data, notice that the padding size isnt
   * encrypted since that would limit the options for the key for the first 3 digits
   * @param key encryption key that is used to encrypt and decrypt the data
   */
  public encrypt(key: string): string {
    return this.makeNumberFixedLengthString(this.paddingSize, this.PADDING_SIZE_IDENTIFIER_NUM_DIGITS)
      + EncrypterService.encrypt(this.toString(), key);
  }

  private makeNumberFixedLengthString(data: number, length: number): string {
    let result: string = data.toString(this.RADIX);
    while (result.length < length) {
      result = "0" + result;
    }
    return result;
  }
}
