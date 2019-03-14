import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material";
import {MatConfigService} from "../snackbar/mat-config.service";
import {RequestedFileExtensionService} from "./requested-file-extension.service";
import {UploadFilePopupComponent} from "./upload-file-popup.component";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private readonly matDialog: MatDialog,
              private readonly matConfigService: MatConfigService,
              private readonly requestedExtension: RequestedFileExtensionService) {
  }

  public requestfile(extension: string, label: string): Promise<string> {
    this.requestedExtension.extension = extension;
    this.requestedExtension.label = label;
    const dialogRef = this.matDialog.open(UploadFilePopupComponent, this.matConfigService.getMatConfig());
    return dialogRef.afterClosed().toPromise();
  }
}
