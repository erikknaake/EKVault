import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {PasswordRequirementsService} from "../shared/password/password-requirements.service";
import {SettingsService} from "../settings/settings.service";
import {UploadFileService} from "../popups/upload-file-popup/upload-file.service";
import {PasswordFileService} from "../shared/password/password-file.service";
import {SnackbarService} from "../popups/snackbar.service";
import {PasswordFormControlFactory} from "../shared/validators/passwordFormControlFactory";
import {IFile} from "../shared/IFile";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.scss']
})
export class ImportExportComponent implements OnInit {
  public passwordLengthControl = new FormControl('', [
    Validators.required,
    Validators.max(PasswordRequirementsService.MAX_PASSWORD_LENGTH),
    Validators.min(PasswordRequirementsService.MIN_PASSWORD_LENGTH)
  ]);

  constructor(private readonly settings: SettingsService,
              private readonly uploadService: UploadFileService,
              private readonly passwordFile: PasswordFileService,
              private readonly snackbar: SnackbarService,) { }

  ngOnInit() {
    this.passwordLengthControl.setValue(this.settings.passwordLength.value);
  }

  public importPasswords(): void {
    this.uploadService.requestfile('.enc', 'Password backup').then((file: IFile) => {
      this.passwordFile.restorePasswords(file.file.value);
    }).catch((reason => {

    }));
  }

  public exportPasswords(): void {
    saveAs(new Blob([this.passwordFile.getAllEncryptedPasswords()], {type: 'text/plain'}), 'Password backup.enc', true);
  }

  public importSettings(): void {
    this.uploadService.requestfile('.json', 'Settings backup').then((file: IFile) => {
      this.settings.restoreJSON(file.file.value);
      this.snackbar.open('Restored settings', 'Ok');
    }).catch((reason) => {

    });
  }

  public exportSettings(): void {
    saveAs(new Blob([this.settings.toJSON()], {type: 'text/plain'}), 'Settings.json', true);
  }
}
