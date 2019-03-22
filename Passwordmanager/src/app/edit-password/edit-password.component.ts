import {Component, OnInit} from '@angular/core';
import {EditPasswordService} from "./edit-password.service";
import {PasswordUIHelperService} from "../password-query-form/password-uihelper.service";
import {Router} from "@angular/router";
import {PasswordFileService} from "../shared/password/password-file.service";

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {

  constructor(public readonly editPasswordService: EditPasswordService,
              public readonly passwordUIHelper: PasswordUIHelperService,
              private readonly router: Router,
              private readonly passwordFile: PasswordFileService) { }

  ngOnInit() {
  }

  public saveChanges(): void {
    this.passwordFile.changePassword(this.editPasswordService.domain, this.editPasswordService.username, this.editPasswordService.password);
    this.discardChanges();
  }

  public discardChanges(): void {
    this.router.navigateByUrl('password/load');
  }
}
