import { Injectable } from '@angular/core';
const nanoid = require('nanoid');
@Injectable({
  providedIn: 'root'
})
export class CSPRNGService {

  constructor() { }

  public static generateCSPRNG(size: number): string {
    return nanoid(size);
  }
}
