/**
 * This class wraps data in a random padding, when encrypting this whole class this padding makes finding patterns in the encryption key or data harder
 */
import {Inject} from "@angular/core";
import {CryptoRandomService} from "./crypto-random.service";

export class EncryptedData {
  private _data: string;
  private _padding: string;
  private _paddingLength: number;
  private static readonly SIZE_IS_MULTIPLE_OF: number = 256;
  private static readonly PADDING_LENGTH_IDENTIFIER_LENGTH = 3;
  constructor(private cryptoRandom) {
  }

  /**
   * Creates a new instance of a EncryptedData object by parsing a string
   * @notice The padding will be randomly generated again to ensure 1 time usage
   * @param str - String to parse
   */
  public static fromString(str: string): EncryptedData {
    const newInstance = new EncryptedData(@Inject(CryptoRandomService));
    newInstance._paddingLength = Number.parseInt(str.substr(0, this.PADDING_LENGTH_IDENTIFIER_LENGTH));
    newInstance.data = str.substr(this.PADDING_LENGTH_IDENTIFIER_LENGTH, str.length - this.PADDING_LENGTH_IDENTIFIER_LENGTH - newInstance.paddingLength);
    newInstance.updatePadding();
    return newInstance;
  }

  get data(): string {
    return this._data;
  }

  set data(value: string) {
    this._data = value;
    this.updatePadding();
  }

  get padding(): string {
    return this._padding;
  }

  set padding(value: string) {
    this._padding = value;
    this._paddingLength = this.padding.length;
  }

  get paddingLength(): number {
    return this._paddingLength;
  }

  public getDataSize(): number {
    return (new TextEncoder().encode(this.data)).length;
  }

  private updatePadding(): void {
    const dataSize: number = this.getDataSize();
    const paddingSize: number = dataSize % EncryptedData.SIZE_IS_MULTIPLE_OF;
    this.padding = this.cryptoRandom.generateSRNG(paddingSize).toString('hex');
  }

  public toString(): string {
    return this.getPaddingLengthString() + this.data + this.padding;
  }

  private getPaddingLengthString(): string {
    let paddingLengthString = this.paddingLength.toString();
    for(let i = 0; i < paddingLengthString  - EncryptedData.PADDING_LENGTH_IDENTIFIER_LENGTH; i++) {
      paddingLengthString = "0" + paddingLengthString;
    }
    return paddingLengthString;
  }
}
