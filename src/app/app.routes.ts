import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginPageComponent} from "./login/login-page/login-page.component";
import {WithoutTokenGuardService} from "./services/tokenGuard/without-token-guard.service";
import {WithTokenGuardService} from "./services/tokenGuard/with-token-guard.service";
import {CartComponent} from "./cart/cart.component";
import {RegisterPageComponent} from "./registration/register-page/register-page.component";
import {ProfileComponent} from "./profile/profile.component";
import {SettingsComponent} from "./profile/settings/settings.component";
import {NgModule} from "@angular/core";
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginPageComponent, canActivate: [WithoutTokenGuardService] },
  { path: 'cart', component: CartComponent, canActivate: [WithTokenGuardService] },
  { path: 'signup', component: RegisterPageComponent, canActivate: [WithoutTokenGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [WithTokenGuardService] },
  { path: 'search/:searchTerm', component: HomeComponent, canActivate: [WithTokenGuardService] },
  { path: 'profile/settings', component: SettingsComponent, canActivate: [WithTokenGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
