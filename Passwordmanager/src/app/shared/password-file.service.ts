import {Injectable} from '@angular/core';
import {PasswordDTO} from "./PasswordDTO";
import {AuthenticateService} from "../popups/authenticate-popup/authenticate.service";
import {NewMasterPasswordService} from "../popups/new-master-password-popup/new-master-password.service";
import {EncryptableDataService} from "../Crypto/encryptable-data.service";
import {IDecryptedPasswords} from "./IDecryptedPasswords";
import {MatSnackBar} from "@angular/material";
import {MatConfigService} from "../popups/snackbar/mat-config.service";
import {SnackbarService} from "../popups/snackbar/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class PasswordFileService {
  private readonly storageKey = 'passwords';
  constructor(private readonly authenticateService: AuthenticateService,
              private readonly newMasterPasswordService: NewMasterPasswordService,
              private readonly snackbar: SnackbarService) {
    if(localStorage.getItem(this.storageKey) == null)
      localStorage.setItem(this.storageKey, '');
  }

  public getPassword(domain: string, username: string): Promise<string> {
   return new Promise<string>((resolve, reject) => {
     this.loadPasswords().then((passwords: IDecryptedPasswords) => {
       resolve(passwords.passwords.filter((x) => x.domain === domain && x.username === username)[0].password);
     }).catch((reason) => {reject(reason)});
   });
  }

  public changePassword(domain: string, newPassword: string, username?: string): void {
    this.loadPasswords().then((passwords: IDecryptedPasswords) => {
      passwords.passwords[passwords.passwords.findIndex((x) => x.domain === domain && x.username === username)].password = newPassword;
      this.storePasswords(passwords);
    }).catch(() => {});
  }

  public addPassword(domain: string, password: string, username: string): Promise<void> {
    return new Promise<void>(((resolve, reject) => {
      this.loadPasswords().then((passwords: IDecryptedPasswords) => {
        passwords.passwords.push(new PasswordDTO(domain, password, username));
        this.storePasswords(passwords);
        resolve();
      }).catch(() => {});
    }));
  }


  /**
   * Stores the given passwordDTO array by converting it to json and then encrypting it with the given masterpassword
   * @param passwords
   *
   * For releases futher down the road, implement splitting this data so more passwords can be stored since the limit is 8kB per item in localStorage
   */
  private storePasswords(passwords: IDecryptedPasswords): void {
      const encryptablePasswords = new EncryptableDataService();
      encryptablePasswords.data = JSON.stringify(passwords.passwords);
      const encryptedPasswords = encryptablePasswords.encrypt(passwords.masterPassword);
      localStorage.setItem(this.storageKey, encryptedPasswords)
  }

  private loadPasswords(): Promise<IDecryptedPasswords> {
    return new Promise<IDecryptedPasswords>((resolve, reject) => {
      this.requestAuthentication().then((masterPassword) => {
        const storagePasswords: string = localStorage.getItem(this.storageKey);
        const decryptedPasswords = EncryptableDataService.fromString(storagePasswords == null ? "" : storagePasswords, masterPassword);
        const result: IDecryptedPasswords = {passwords: JSON.parse(decryptedPasswords.data), masterPassword: masterPassword};
        resolve(result);
      }).catch((reason) => {
        console.log('catch: ', reason);
        this.snackbar.open('Masterpassword is incorrect', 'Ok');
        reject(reason);
      });
    });
  }

  public updateMasterPassword(): void {
    const passwords = this.loadPasswords().then((passwords: IDecryptedPasswords) => {
      this.requestNewMasterPassword().then((newMasterPassword: string) => {
        this.storePasswords({passwords: passwords.passwords, masterPassword: newMasterPassword});
      });
    }).catch(() => {});
  }

  private requestAuthentication(): Promise<string> {
    return this.authenticateService.requestMasterPassword()
  }

  private requestNewMasterPassword(): Promise<string> {
    return this.newMasterPasswordService.requestMasterPassword();
  }
}
