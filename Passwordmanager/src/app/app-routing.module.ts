import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewPasswordComponent} from "./new-password/new-password.component";
import {LoadPasswordComponent} from "./load-password/load-password.component";
import {SettingsComponent} from "./settings/settings.component";

const routes: Routes = [
  {path: 'new', component: NewPasswordComponent},
  {path: 'load', component: LoadPasswordComponent},
  {path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
