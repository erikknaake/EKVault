import { Injectable } from '@angular/core';
declare let require;
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
