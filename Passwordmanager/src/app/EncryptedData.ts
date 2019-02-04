import * as crypto from 'crypto';


/**
 * This class wraps data in a random padding, when encrypting this whole class this padding makes finding patterns in the encryption key or data harder
 */
export class EncryptedData {
  private _data: string;
  private _padding: string;
  private _paddingLength: number;
  public readonly SIZE_IS_MULTIPLE_OF: number = 256;

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
    const paddingSize: number = dataSize % this.SIZE_IS_MULTIPLE_OF;
    this.padding = crypto.randomBytes(paddingSize).toString('hex');
  }

  public toString(): string {
    return this.paddingLength.toString() + this.data + this.padding;
  }
}
