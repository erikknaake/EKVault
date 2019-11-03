import {TestBed} from "@angular/core/testing";
import {PasswordFileService} from "./password-file.service";
import {SnackbarService} from "../../popups/snackbar/snackbar.service";
import {NewMasterPasswordService} from "../../popups/new-master-password-popup/new-master-password.service";
import {AuthenticateService} from "../../popups/authenticate-popup/authenticate.service";
import {ReplaceUsernamePopupService} from "../../popups/replace-usernames-popup/replace-username-popup.service";
import {EncryptableDataService} from "../../Crypto/encryptable-data.service";
import {IDecryptedPasswords} from "./IDecryptedPasswords";

describe('PasswordFileService', () => {
  let service: PasswordFileService;
  let snackbarSpy;
  let masterPasswordSpy;
  let authenticateSpy;
  let changeUsernameSpy;
  let localStorageGetSpy;
  let localStorageSetSpy;
  const decryptedPassword: IDecryptedPasswords = {
    masterPassword: 'masterPassword',
    passwords: [
      {domain: 'localhost', username: 'Erik', password: 'password'},
      {domain: 'npm', username: 'Test', password: 'P@ssword'}
    ]
  };

  beforeEach(() => {
    snackbarSpy = jasmine.createSpyObj(['open']);
    masterPasswordSpy = jasmine.createSpyObj(['requestMasterPassword']);
    authenticateSpy = jasmine.createSpyObj(['requestMasterPassword']);
    changeUsernameSpy = jasmine.createSpyObj(['popup']);
    localStorageGetSpy = spyOn(localStorage, 'getItem');
    localStorageGetSpy.and.returnValue('');
    localStorageSetSpy = spyOn(localStorage, 'setItem');
    TestBed.configureTestingModule({
      providers: [
        {provide: SnackbarService, useValue: snackbarSpy},
        {provide: NewMasterPasswordService, useValue: masterPasswordSpy},
        {provide: AuthenticateService, useValue: authenticateSpy},
        {provide: ReplaceUsernamePopupService, useValue: changeUsernameSpy},
        PasswordFileService
      ]
    });
    service = TestBed.get(PasswordFileService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('isPasswordIdentifiedBy', () => {
    it('should be able to tell IPasswords from each other', () => {
      expect(PasswordFileService.isPasswordIdentifiedBy({
        password: 'password',
        domain: 'localhost',
        username: 'Erik'
      }, 'localhost', 'Erik')).toEqual(true);
    });

    it('should be able to tell IPasswords from each other, no match on username', () => {
      expect(PasswordFileService.isPasswordIdentifiedBy({
        password: 'password',
        domain: 'localhost',
        username: 'Erik'
      }, 'localhost', 'Test')).toEqual(false);
    });

    it('should be able to tell IPasswords from each other, no match on domain', () => {
      expect(PasswordFileService.isPasswordIdentifiedBy({
        password: 'password',
        domain: 'localhost',
        username: 'Erik'
      }, 'npm', 'Erik')).toEqual(false);
    });

    it('should be able to tell IPasswords from each other, no match on domain and username', () => {
      expect(PasswordFileService.isPasswordIdentifiedBy({
        password: 'password',
        domain: 'localhost',
        username: 'Erik'
      }, 'npm', 'Test')).toEqual(false);
    });
  });

  it('should be able to give the encrypted password string', () => {
    localStorageGetSpy.and.returnValue('abc');
    expect(service.getAllEncryptedPasswords()).toEqual('abc');
    expect(localStorageGetSpy).toHaveBeenCalledTimes(1);
    expect(localStorageGetSpy).toHaveBeenCalledWith('passwords');
  });

  it('should be able to give the encrypted password string, default empty string', () => {
    localStorageGetSpy.and.returnValue(null);
    expect(service.getAllEncryptedPasswords()).toEqual("");
    expect(localStorageGetSpy).toHaveBeenCalledTimes(1);
    expect(localStorageGetSpy).toHaveBeenCalledWith('passwords');
  });

  it('should be able to restore the localStorage from a encrypted password string', () => {
    service.restorePasswords('Encrypted string');
    expect(localStorageSetSpy).toHaveBeenCalledTimes(1);
    expect(localStorageSetSpy).toHaveBeenCalledWith('passwords', 'Encrypted string');
  });

  it('should be able to decrypt the localStorage', (done) => {
    let fromStringSpy = spyOn(EncryptableDataService, 'fromString');
    fromStringSpy.and.returnValue({
      data: '[{"domain":"localhost","username":"Erik","password":"password"},{"domain":"npm","username":"Test","password":"P@ssword"}]'
    });
    authenticateSpy.requestMasterPassword.and.returnValue(Promise.resolve('masterPassword'));
    service['loadPasswords']().then((passwords: IDecryptedPasswords) => {
      expect(authenticateSpy.requestMasterPassword).toHaveBeenCalledTimes(1);
      expect(authenticateSpy.requestMasterPassword).toHaveBeenCalledWith();
      expect(fromStringSpy).toHaveBeenCalledTimes(1);
      expect(passwords).toEqual(decryptedPassword);
      done();
    }).catch((reason) => {
      fail();
      done();
    });
  });

  it('should throw an error when a incorrect masterPassword is given', (done) => {
    let requestAuthenSpy = spyOn<any>(service, 'requestAuthentication');
    requestAuthenSpy.and.returnValue(Promise.reject('password'));
    service['loadPasswords']().then(() => {
      fail();
      done();
    }).catch((reason) => {
      expect(snackbarSpy.open).toHaveBeenCalledTimes(1);
      expect(snackbarSpy.open).toHaveBeenCalledWith('Masterpassword is incorrect', 'Ok');
      expect(reason).toEqual('password');
      done();
    })
  });

  it('should store passwords in an encrypted way', () => {
    let jsonSpy = spyOn(JSON, 'stringify');
    jsonSpy.and.callThrough();
    let encryptSpy = jasmine.createSpyObj(['encrypt']);
    encryptSpy.encrypt.and.returnValue('abdef');
    let newEncryptableServiceSpy = spyOn(EncryptableDataService, 'newInstance');
    newEncryptableServiceSpy.and.returnValue(encryptSpy);

    service['storePasswords'](decryptedPassword);

    expect(jsonSpy).toHaveBeenCalledTimes(1);
    expect(jsonSpy).toHaveBeenCalledWith([{domain: 'localhost', username: 'Erik', password: 'password'},
      {domain: 'npm', username: 'Test', password: 'P@ssword'}]);
    expect(newEncryptableServiceSpy).toHaveBeenCalledTimes(1);
    expect(encryptSpy.encrypt).toHaveBeenCalledTimes(1);
    expect(encryptSpy.encrypt).toHaveBeenCalledWith('masterPassword');
    expect(localStorageSetSpy).toHaveBeenCalledTimes(1);
    expect(localStorageSetSpy).toHaveBeenCalledWith('passwords', 'abdef');
  });

  it('should get a password', (done) => {
    let loadPasswordSpy = spyOn<any>(service, 'loadPasswords');
    loadPasswordSpy.and.returnValue(Promise.resolve(decryptedPassword));

    service.getPassword('localhost', 'Erik').then((password: string) => {
      expect(password).toEqual('password');
      expect(loadPasswordSpy).toHaveBeenCalledTimes(1);
      done();
    }).catch(() => {
      fail();
      done();
    });
  });

  it('should fail to get a password', (done) => {
    let loadPasswordSpy = spyOn<any>(service, 'loadPasswords');
    loadPasswordSpy.and.returnValue(Promise.reject('invalid'));

    service.getPassword('localhost', 'Erik').then((password: string) => {
      fail();
      done();
    }).catch((reason) => {
      expect(reason).toEqual('invalid');
      expect(loadPasswordSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should not change username when the new username is already in use', (done) => {
    let loadPasswordSpy = spyOn<any>(service, 'loadPasswords');
    loadPasswordSpy.and.returnValue(Promise.resolve(decryptedPassword));
    service.changeUsername('Erik', 'Test').then(() => {
      fail();
      done();
    }).catch((reason) => {
      expect(reason).toEqual('username');
      expect(loadPasswordSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should not change username when it would change multiple usernames', (done) => {
    let loadPasswordSpy = spyOn<any>(service, 'loadPasswords');
    const decryptedPasswords2 = decryptedPassword;
    decryptedPasswords2.passwords.push({domain: 'google', username: 'Erik', password: 'pass'});
    loadPasswordSpy.and.returnValue(Promise.resolve(decryptedPasswords2));
    service.changeUsername('Erik', 'Test').then(() => {
      fail();
      done();
    }).catch((reason) => {
      expect(reason).toEqual('username');
      expect(loadPasswordSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  // it('should change username', (done) => {
  //   let loadPasswordSpy = spyOn<any>(service, 'loadPasswords');
  //   loadPasswordSpy.and.returnValue(Promise.resolve(decryptedPassword));
  //   let storePasswordSpy = spyOn<any>(service, 'storePasswords');
  //   const decryptedExpected2 = decryptedPassword;
  //   decryptedExpected2.passwords[0].username = 'HAN';
  //
  //   service.changeUsername('Erik', 'HAN').then((data) => {
  //     expect(data).toEqual(true);
  //     expect(storePasswordSpy).toHaveBeenCalledTimes(1);
  //     expect(storePasswordSpy).toHaveBeenCalledWith(decryptedExpected2);
  //     expect(loadPasswordSpy).toHaveBeenCalledTimes(1);
  //     done();
  //   }).catch((reason) => {
  //     fail();
  //     done();
  //   });
  // });
});
