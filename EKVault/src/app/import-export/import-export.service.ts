import { Injectable } from '@angular/core';
import {SettingsService} from "../settings/settings.service";
import {UploadFileService} from "../popups/upload-file-popup/upload-file.service";
import {PasswordFileService} from "../shared/password/password-file.service";
import {SnackbarService} from "../popups/snackbar/snackbar.service";
import {IFile} from "../shared/IFile";
import {saveAs} from "file-saver";

@Injectable({
  providedIn: 'root'
})
export class ImportExportService {

  constructor(private readonly settings: SettingsService,
              private readonly uploadService: UploadFileService,
              private readonly passwordFile: PasswordFileService,
              private readonly snackbar: SnackbarService) { }

  public importPasswords(): void {
    console.log('import password');
    this.uploadService.requestFile('.enc', 'Password backup').then((file: IFile) => {
      console.log('inside then');
      this.passwordFile.restorePasswords(file.file.value);
      this.snackbar.open('Restored passwords', 'Ok');
    }).catch((reason => {

    }));
  }

  public exportPasswords(): void {
    saveAs(new Blob([this.passwordFile.getAllEncryptedPasswords()], {type: 'text/plain'}), 'Password backup.enc', true);
  }

  public importSettings(): void {
    this.uploadService.requestFile('.json', 'Settings backup').then((file: IFile) => {
      this.settings.restoreJSON(file.file.value);
      this.snackbar.open('Restored settings', 'Ok');
    }).catch((reason) => {

    });
  }

  public exportSettings(): void {
    saveAs(new Blob([this.settings.toJSON()], {type: 'text/plain'}), 'Settings.json', true);
  }
}
