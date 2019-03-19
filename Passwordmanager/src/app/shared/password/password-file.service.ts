import {Injectable} from '@angular/core';
import {PasswordDTO} from "./PasswordDTO";
import {AuthenticateService} from "../popups/authenticate-popup/authenticate.service";
import {NewMasterPasswordService} from "../popups/new-master-password-popup/new-master-password.service";
import {EncryptableDataService} from "../Crypto/encryptable-data.service";
import {IDecryptedPasswords} from "./IDecryptedPasswords";
import {SnackbarService} from "../popups/snackbar/snackbar.service";
import {IPassword} from "./IPassword";
import {IPasswordChange} from "./IPasswordChange";
import {ReplaceUsernamePopupService} from "../popups/replace-usernames-popup/replace-username-popup.service";
import {ArrayHelper} from "./ArrayHelper";

@Injectable({
  providedIn: 'root'
})
export class PasswordFileService {
  private readonly storageKey = 'passwords';

  constructor(private readonly authenticateService: AuthenticateService,
              private readonly newMasterPasswordService: NewMasterPasswordService,
              private readonly snackbar: SnackbarService,
              private readonly changeUsernamePopup: ReplaceUsernamePopupService) {
  }

  public getPassword(domain: string, username: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.loadPasswords().then((passwords: IDecryptedPasswords) => {
        resolve(passwords.passwords.filter((x: IPassword) => PasswordFileService.isPasswordIdentifiedBy(x, domain, username))[0].password);
      }).catch((reason) => {
        reject(reason)
      });
    });
  }

  public changePassword(domain: string, newPassword: string, username: string): void {
    this.loadPasswords().then((passwords: IDecryptedPasswords) => {
      passwords.passwords[passwords.passwords.findIndex((x: IPassword) => PasswordFileService.isPasswordIdentifiedBy(x, domain, username))].password = newPassword;
      this.storePasswords(passwords);
    }).catch(() => {
    });
  }

  public changeUsername(oldUsername: string, newUsername: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.loadPasswords().then((passwords: IDecryptedPasswords) => {
        let numberOfUsernamesChanged: number = 0;
        let newUsernameAlreadyUsed: boolean = false;
        for (let iPassword of passwords.passwords) {
          if (iPassword.username === oldUsername) {
            iPassword.username = newUsername;
            numberOfUsernamesChanged++;
          } else if (iPassword.username === newUsername) {
            newUsernameAlreadyUsed = true;
            break;
          }
        }
        if (newUsernameAlreadyUsed || numberOfUsernamesChanged > 1) {
          reject('username');
        }
        this.storePasswords(passwords);
        resolve(true);
      }).catch((reason) => {

      });
    });
  }

  public deleteUsername(username: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.changeUsernamePopup.popup().then((accepted) => {
        if (accepted) {
          this.loadPasswords().then((passwords: IDecryptedPasswords) => {
            for (let iPassword of passwords.passwords) {
              if (iPassword.username === username) {
                passwords.passwords = ArrayHelper.removeItem(passwords.passwords, iPassword);
              }
            }
            this.storePasswords(passwords);
            resolve(true);
          }).catch(() => {
            reject('Canceled');
          });
        } else {
          reject('Not accepted');
        }
      }).catch((reason)=> {
        reject(reason);
      });
    });
  }

  private static isPasswordIdentifiedBy(x: IPassword, domain: string, username: string): boolean {
    return x.domain === domain && x.username === username;
  }

  public addPassword(domain: string, password: string, username: string): Promise<void> {
    return new Promise<void>(((resolve, reject) => {
      this.loadPasswords().then((passwords: IDecryptedPasswords) => {
        if (passwords.passwords.filter((x: IPassword) => PasswordFileService.isPasswordIdentifiedBy(x, domain, username)).length > 1) {
          this.snackbar.open('There already is a password for this domain and username', 'Ok');
          reject('There already is a password for this domain and username');
        }
        passwords.passwords.push(new PasswordDTO(domain, password, username));
        this.storePasswords(passwords);
        resolve();
      }).catch(() => {
      });
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
        resolve(this.decryptStorage(masterPassword));
      }).catch((reason) => {
        this.snackbar.open('Masterpassword is incorrect', 'Ok');
        reject(reason);
      });
    });
  }

  private decryptStorage(masterPassword): IDecryptedPasswords {
    const storagePasswords: string = this.getAllEncryptedPasswords();
    const decryptedPasswords = EncryptableDataService.fromString(storagePasswords == null ? "" : storagePasswords, masterPassword);
    const parsedPasswords = (JSON.parse(decryptedPasswords.data) as IPassword[]);
    return {passwords: parsedPasswords, masterPassword: masterPassword};
  }

  public getAllEncryptedPasswords(): string {
    return localStorage.getItem(this.storageKey);
  }

  public restorePasswords(encryptedPasswords: string): void {
    localStorage.setItem(this.storageKey, encryptedPasswords);
  }

  private requestAuthentication(): Promise<string> {
    return this.authenticateService.requestMasterPassword();
  }

  public requestNewMasterPassword(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.newMasterPasswordService.requestMasterPassword().then((passwords: IPasswordChange) => {
        const decryptedPasswords: IDecryptedPasswords = this.decryptStorage(passwords.oldPassword);
        decryptedPasswords.masterPassword = passwords.newPassword;
        this.storePasswords(decryptedPasswords);
        resolve(true);
      }).catch(() => {
        reject(false);
      });
    });
  }
}
