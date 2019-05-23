import {Component} from '@angular/core';
import {ImportExportService} from "./import-export.service";

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.scss']
})
export class ImportExportComponent {

  constructor(private readonly importExportService: ImportExportService) { }

}
