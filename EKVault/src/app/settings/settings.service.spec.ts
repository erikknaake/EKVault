import {TestBed} from '@angular/core/testing';

import {SettingsService} from './settings.service';

describe('SettingsService', () => {
  let localStorageGetItemSpy;
  let localStorageSetItemSpy;
  let bodyRemoveClassSpy;
  let bodyAddClassSpy;
  let service: SettingsService;

  beforeEach(() => {
    localStorageGetItemSpy = spyOn(localStorage, 'getItem');
    localStorageSetItemSpy = spyOn(localStorage, 'setItem');
    bodyRemoveClassSpy = spyOn(document.body.classList, 'remove');
    bodyAddClassSpy = spyOn(document.body.classList, 'add');
    TestBed.configureTestingModule({});
  });

  describe('with usual settings', () => {
    beforeEach(() => {
      localStorageGetItemSpy.and.returnValue('{"alphabet": "abc", "passwordLength": 10, "defaultUsername": "Erik", "usernames": ["Erik", "Knaake"], "isDarkTheme": false}');
      service = TestBed.get(SettingsService);
    });

    it('should be created with localStorage settings', () => {
      expect(service).toBeTruthy();
      expect(service.alphabet.value).toEqual('abc');
      expect(service.passwordLength.value).toEqual(10);
      expect(service.defaultUsername.value).toEqual('Erik');
      expect(service.isDarkTheme.value).toEqual(false);
      expect(service.usernames.value).toEqual(['Erik', 'Knaake']);
      expect(localStorageGetItemSpy).toHaveBeenCalledTimes(1);
      expect(localStorageGetItemSpy).toHaveBeenCalledWith('settings');
      expect(bodyRemoveClassSpy).toHaveBeenCalledTimes(1);
      expect(bodyRemoveClassSpy).toHaveBeenCalledWith('dark-theme');
      expect(localStorageSetItemSpy).toHaveBeenCalledWith('settings', '{"alphabet":"abc","passwordLength":10,"defaultUsername":"Erik","usernames":["Erik","Knaake"],"isDarkTheme":false}');
    });

    it('should change the username', () => {
      service.changeUsername('Erik', 'Test');
      expect(localStorageSetItemSpy).toHaveBeenCalledTimes(2);
      expect(localStorageSetItemSpy).toHaveBeenCalledWith('settings', '{"alphabet":"abc","passwordLength":10,"defaultUsername":"Erik","usernames":["Test","Knaake"],"isDarkTheme":false}');
    });

    it('should delete the username', () => {
      service.deleteUsername('Erik');
      expect(localStorageSetItemSpy).toHaveBeenCalledTimes(2);
      expect(localStorageSetItemSpy).toHaveBeenCalledWith('settings', '{"alphabet":"abc","passwordLength":10,"defaultUsername":"Erik","usernames":["Knaake"],"isDarkTheme":false}');
    });

    it('should add the user', (done) => {
      service.addUsername('Test').then((value) => {
        expect(localStorageSetItemSpy).toHaveBeenCalledTimes(2);
        expect(localStorageSetItemSpy).toHaveBeenCalledWith('settings', '{"alphabet":"abc","passwordLength":10,"defaultUsername":"Erik","usernames":["Erik","Knaake","Test"],"isDarkTheme":false}');
        expect(value).toEqual(true);
        done();
      }).catch(() => {
        fail();
        done();
      });
    });

    it('should not add the user, because it already exists', (done) => {
      service.addUsername('Erik').then((value) => {
        fail();
        done();
      }).catch((reason) => {
        expect(reason).toEqual('username');
        expect(localStorageSetItemSpy).toHaveBeenCalledTimes(1);
        done();
      });
    });

  });

  describe('withoutDefaultuser', () => {
    beforeEach(() => {
      localStorageGetItemSpy.and.returnValue('{"alphabet": "abc", "passwordLength": 10, "defaultUsername": null, "usernames": ["Erik", "Knaake"], "isDarkTheme": false}');
      service = TestBed.get(SettingsService);
    });

    it('should add the user and set it as default', (done) => {
      service.addUsername('Test').then((value) => {
        expect(localStorageSetItemSpy).toHaveBeenCalledTimes(2);
        expect(localStorageSetItemSpy).toHaveBeenCalledWith('settings', '{"alphabet":"abc","passwordLength":10,"defaultUsername":"Test","usernames":["Erik","Knaake","Test"],"isDarkTheme":false}');
        expect(value).toEqual(true);
        done();
      }).catch(() => {
        fail();
        done();
      });
    });
  });

  describe('default settings', () => {
    beforeEach(() => {
      localStorageGetItemSpy.and.returnValue(null);
      service = TestBed.get(SettingsService);
    });

    it('should be created with default settings', () => {
      expect(service).toBeTruthy();
      expect(service.alphabet.value).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+=.?/;!@#$%^&*()`~ <>_-\\');
      expect(service.passwordLength.value).toEqual(28);
      expect(service.defaultUsername.value).toEqual(null);
      expect(service.isDarkTheme.value).toEqual(true);
      expect(service.usernames.value).toEqual([]);
      expect(localStorageGetItemSpy).toHaveBeenCalledTimes(1);
      expect(localStorageGetItemSpy).toHaveBeenCalledWith('settings');
      expect(bodyAddClassSpy).toHaveBeenCalledTimes(1);
      expect(bodyAddClassSpy).toHaveBeenCalledWith('dark-theme');
      expect(localStorageSetItemSpy).toHaveBeenCalledTimes(1);
      expect(localStorageSetItemSpy).toHaveBeenCalledWith('settings', '{"alphabet":"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+=.?/;!@#$%^&*()`~ <>_-\\\\","passwordLength":28,"defaultUsername":null,"usernames":[],"isDarkTheme":true}');
    });
  });

  describe('with dark theme settings', () => {
    beforeEach(() => {
      localStorageGetItemSpy.and.returnValue('{"alphabet": "abc", "passwordLength": 10, "defaultUsername": "Erik", "usernames": ["Erik", "Knaake"], "isDarkTheme": true}');
      service = TestBed.get(SettingsService);
    });

    it('should be created with localStorage settings', () => {
      expect(service).toBeTruthy();
      expect(service.alphabet.value).toEqual('abc');
      expect(service.passwordLength.value).toEqual(10);
      expect(service.defaultUsername.value).toEqual('Erik');
      expect(service.isDarkTheme.value).toEqual(true);
      expect(service.usernames.value).toEqual(['Erik', 'Knaake']);
      expect(localStorageGetItemSpy).toHaveBeenCalledTimes(1);
      expect(localStorageGetItemSpy).toHaveBeenCalledWith('settings');
      expect(bodyAddClassSpy).toHaveBeenCalledTimes(1);
      expect(bodyAddClassSpy).toHaveBeenCalledWith('dark-theme');
    });
  });
});
