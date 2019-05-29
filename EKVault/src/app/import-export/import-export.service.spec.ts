import { TestBed } from '@angular/core/testing';
import { ImportExportService } from './import-export.service';
import {UploadFileService} from "../popups/upload-file-popup/upload-file.service";
import {PasswordFileService} from "../shared/password/password-file.service";
import {SnackbarService} from "../popups/snackbar/snackbar.service";
import * as FileSaver from "file-saver";
import {SettingsService} from "../settings/settings.service";

describe('ImportExportService', () => {
  let snackbarSpy;
  let settingsSpy;
  let passwordFileSpy;
  let uploadServiceSpy;
  let saveAsSpy;

  const settingsJSON = '{"usernames":["erik", "test"],"isDarkTheme":true}';
  const encryptedPasswords = 'abhsfefgeg';
  let service: ImportExportService;

  beforeEach(() => {
    saveAsSpy = spyOn(FileSaver, 'saveAs');
    uploadServiceSpy = jasmine.createSpyObj('UploadFileService', ['requestFile']);
    uploadServiceSpy.requestFile.and.returnValue(Promise.resolve({file: {value: 'abc'}}));

    passwordFileSpy = jasmine.createSpyObj('PasswordFileService', ['restorePasswords', 'getAllEncryptedPasswords']);
   // passwordFileSpy.restorePasswords.and.callFake(() => {console.log('restore passwords')});
    passwordFileSpy.getAllEncryptedPasswords.and.returnValue(encryptedPasswords);

    snackbarSpy = jasmine.createSpyObj('SnackbarService', ['open']);
   // snackbarSpy.open.and.callFake(() => {console.log('open')});
    settingsSpy = jasmine.createSpyObj('SettingsService', ['restoreJSON', 'toJSON']);
    settingsSpy.toJSON.and.returnValue(settingsJSON);

    TestBed.configureTestingModule({
      providers: [
        {provide: UploadFileService, useValue: uploadServiceSpy },
        {provide: PasswordFileService, useValue: passwordFileSpy },
        {provide: SnackbarService, useValue: snackbarSpy},
        {provide: SettingsService, useValue: settingsSpy},
      ]
    });
    service = TestBed.get(ImportExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should export passwords', () => {
    service.exportPasswords();
    expect(passwordFileSpy.getAllEncryptedPasswords).toHaveBeenCalledTimes(1);
    expect(saveAsSpy).toHaveBeenCalledTimes(1);
    expect(saveAsSpy).toHaveBeenCalledWith(new Blob([encryptedPasswords], {type: 'text/plain'}), 'Password backup.enc', true);
  });

  it('should export settings', () => {
    service.exportSettings();
    expect(settingsSpy.toJSON).toHaveBeenCalledTimes(1);
    expect(saveAsSpy).toHaveBeenCalledTimes(1);
    expect(saveAsSpy).toHaveBeenCalledWith(new Blob([settingsJSON], {type: 'text/plain'}), 'Settings.json', true);
  });

  // TODO fix tests
  // it('should import passwords', () => {
  //   service.importPasswords();
  //   expect(uploadServiceSpy.requestFile).toHaveBeenCalledTimes(1);
  //   expect(uploadServiceSpy.requestFile).toHaveBeenCalledWith('.enc', 'Password backup');
  //   expect(passwordFileSpy.restorePasswords).toHaveBeenCalledTimes(1);
  //   expect(passwordFileSpy.restorePasswords).toHaveBeenCalledWith('abc');
  //   expect(snackbarSpy.open).toHaveBeenCalledTimes(1);
  //   expect(snackbarSpy.open).toHaveBeenCalledWith('Restored passwords', 'Ok');
  // });
  //
  // it('should import settings', () => {
  //   service.importSettings();
  //   expect(uploadServiceSpy.requestFile).toHaveBeenCalledTimes(1);
  //   expect(uploadServiceSpy.requestFile).toHaveBeenCalledWith('.json', 'Settings backup');
  //   expect(settingsSpy.restoreJSON).toHaveBeenCalledTimes(1);
  //   expect(settingsSpy.restoreJSON).toHaveBeenCalledWith('abc');
  //   expect(snackbarSpy.open).toHaveBeenCalledTimes(1);
  //   expect(snackbarSpy.open).toHaveBeenCalledWith('Restored settings', 'Ok');
  // });
});
