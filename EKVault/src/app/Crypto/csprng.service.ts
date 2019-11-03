import {AlphabetService} from "../shared/password/alphabet.service";

declare let require;
const generate = require('nanoid/generate');
export class CSPRNGService {

  public static generateCSPRN(size: number): string {
    return generate(AlphabetService.getAlphabet(), size);
  }
}
