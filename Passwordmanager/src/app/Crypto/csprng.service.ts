import {Injectable} from '@angular/core';
import {AlphabetService} from "../shared/alphabet.service";

declare let require;
const generate = require('nanoid/generate');
@Injectable({
  providedIn: 'root'
})
export class CSPRNGService {

  constructor() { }

  public static generateCSPRN(size: number): string {
    return generate(AlphabetService.getAlphabet(), size);
  }
}
