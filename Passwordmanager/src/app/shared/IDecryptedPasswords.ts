import {PasswordDTO} from "./PasswordDTO";

export interface IDecryptedPasswords {
  passwords: PasswordDTO[];
  masterPassword: string;
}
