import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { LoadPasswordComponent } from './load-password/load-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NewPasswordComponent,
    LoadPasswordComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
