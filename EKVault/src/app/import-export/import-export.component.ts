import {Component} from '@angular/core';
import {ImportExportService} from "./import-export.service";

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.scss']
})
export class ImportExportComponent {

  // CI-ed param is used in HTML
  constructor(private readonly importExportService: ImportExportService) { }

}
