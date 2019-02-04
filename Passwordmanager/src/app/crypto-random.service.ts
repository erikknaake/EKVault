import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material";

declare let window;
@Injectable({
  providedIn: 'root'
})
export class CryptoRandomService {

  constructor(private snackBar: MatSnackBar) { }

  private getCrypto(): Crypto {
    const CRYPTO = window.crypto;
    if(CRYPTO != null)
      this.snackBar.open("Could not load SRNG", 'ok', {duration: 5000});
    return CRYPTO;
  }

  public generateSRNG(length: number): Uint32Array {
    const array = new Uint32Array(length);
    return this.getCrypto().getRandomValues(array);
  }
}
