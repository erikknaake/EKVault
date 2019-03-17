import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NewMasterPasswordPopupComponent} from './popups/new-master-password-popup/new-master-password-popup.component';
import {SettingsComponent} from './settings/settings.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {NavigationComponent} from './navigation/navigation.component';
import {MaterialMdsModule} from "./material-mds";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticatePopupComponent} from './popups/authenticate-popup/authenticate-popup.component';
import {getTabs} from "./shared/Window";
import {NewPasswordComponent} from "./password-query-form/new-password/new-password.component";
import {LoadPasswordComponent} from "./password-query-form/load-password/load-password.component";
import {PasswordQueryFormComponent} from "./password-query-form/password-query-form.component";
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import {UploadFilePopupComponent} from "./popups/upload-file-popup/upload-file-popup.component";
import {ChangeAlphabetComponent} from "./settings/change-alphabet/change-alphabet.component";
@NgModule({
  declarations: [
    AppComponent,
    NewMasterPasswordPopupComponent,
    SettingsComponent,
    ChangePasswordComponent,
    NavigationComponent,
    AuthenticatePopupComponent,
    NewMasterPasswordPopupComponent,
    NewPasswordComponent,
    LoadPasswordComponent,
    PasswordQueryFormComponent,
    UploadFilePopupComponent,
    ChangeAlphabetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialMdsModule,
    MatPasswordStrengthModule
  ],
  providers: [{provide: 'tabs', useFactory: getTabs}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [AuthenticatePopupComponent, UploadFilePopupComponent, NewMasterPasswordPopupComponent]
})
export class AppModule {
}
