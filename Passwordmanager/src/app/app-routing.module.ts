import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoadPasswordComponent} from "./load-password/load-password.component";
import {SettingsComponent} from "./settings/settings.component";
import {NewPasswordComponent} from "./new-password/new-password.component";

const routes: Routes = [
  {path: 'new', component: NewPasswordComponent},
  {path: 'load', component: LoadPasswordComponent},
  {path: 'settings', component: SettingsComponent},
  {path: '', redirectTo: '/load', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
