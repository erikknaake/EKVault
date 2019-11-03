import {IPassword} from "./IPassword";

export interface IDecryptedPasswords {
  passwords: IPassword[];
  masterPassword: string;
}
