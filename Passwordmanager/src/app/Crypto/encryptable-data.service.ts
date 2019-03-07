import { Injectable } from '@angular/core';
import {EncrypterService} from "./encrypter.service";

@Injectable({
  providedIn: 'root'
})
export class EncryptableDataService {

  private _padding: string;
  private _data: string;
  private _paddingSize: number;
  private readonly MAX_PADDING_SIZE: number;
  private readonly PADDING_SIZE_IDENTIFIER_SIZE: number;

  constructor() { }

  get data(): string {
    return this._data;
  }

  set data(value: string) {
    this._data = value;
    this.updatePadding()
  }

  get paddingSize(): number {
    return this._paddingSize;
  }

  set paddingSize(value: number) {
    this._paddingSize = value;
  }

  get padding(): string {
    return this._padding;
  }

  set padding(value: string) {
    this._padding = value;
  }

  private updatePadding(): void {
    //TODO: update padding
    this.updatePaddingLength()
  }

  private updatePaddingLength(): void {
    this.paddingSize = this.padding.length;
    //TODO: prefix zeros until it fits in correct number of characters
  }

  public toString(): string {
    return this.paddingSize + this.data + this.padding
  }

  public encrypt(key: string): string {
    return EncrypterService.encrypt(this.toString(), key);
  }

  public static fromString(encryptableData: string): EncryptableDataService {
    return null;
  }
}
