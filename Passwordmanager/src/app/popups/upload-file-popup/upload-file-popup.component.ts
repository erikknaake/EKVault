import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestedFileExtensionService} from "./requested-file-extension.service";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file-popup.component.html',
  styleUrls: ['./upload-file-popup.component.scss']
})
export class UploadFilePopupComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean;
  public invalid: boolean = false;
  public filePresent: boolean = false;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(public readonly dialogRef: MatDialogRef<UploadFilePopupComponent>,
              private readonly formBuilder: FormBuilder,
              public readonly requestedExtension: RequestedFileExtensionService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [
        '',
        Validators.required
      ],
      file: null
    });
  }

  public onSubmit(): void {
    this.loading = true;
    this.dialogRef.close(this.form.value);
    this.loading = false;
  }

  public onFileChange(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsText(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          if(file.name.includes(this.requestedExtension.extension)) {
            this.form.get('file').setValue({
              filename: file.name,
              filetype: file.type,
              value: reader.result
            });
            this.invalid = false;
            this.filePresent = true;
          }
          else {
            this.invalid = true;
            // TODO: show error, incorrect file type
          }
        }
      };
    }
  }
}
