import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingsComponent} from "./settings/settings.component";
import {PasswordQueryFormComponent} from "./password-query-form/password-query-form.component";
import {LoadPasswordComponent} from "./password-query-form/load-password/load-password.component";
import {NewPasswordComponent} from "./password-query-form/new-password/new-password.component";

const routes: Routes = [
  {
    path: 'password', component: PasswordQueryFormComponent, children: [
      {path: '', redirectTo: 'load', pathMatch: 'full'},
      {path: 'new', component: NewPasswordComponent},
      {path: 'load', component: LoadPasswordComponent},
    ]
  },
  {path: 'settings', component: SettingsComponent},
  {path: '', redirectTo: 'password/load', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
