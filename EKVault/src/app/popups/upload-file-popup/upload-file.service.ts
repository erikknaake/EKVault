import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material";
import {MatConfigService} from "../mat-config.service";
import {RequestedFileExtensionService} from "./requested-file-extension.service";
import {UploadFilePopupComponent} from "./upload-file-popup.component";
import {IFile} from "../../shared/IFile";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private readonly matDialog: MatDialog,
              private readonly matConfigService: MatConfigService,
              private readonly requestedExtension: RequestedFileExtensionService) {
  }

  private getFile(extension: string, label: string): Promise<IFile> {
    this.requestedExtension.extension = extension;
    this.requestedExtension.label = label;
    const dialogRef = this.matDialog.open(UploadFilePopupComponent, this.matConfigService.getMatConfig());
    return dialogRef.afterClosed().toPromise();
  }

  public requestfile(extension: string, label: string): Promise<IFile> {
    return new Promise<IFile>(((resolve, reject) => {
      this.getFile(extension, label).then((file: IFile) => {
        if (file == null) {
          reject('No file given');
        } else {
          resolve(file);
        }
      });
    }));
  }
}
