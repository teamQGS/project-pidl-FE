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
import {UserDeshboardComponent} from "./user-dashboard/user-deshboard.component";
import {AdminDeshboardComponent} from "./admin-dashboard/admin-deshboard.component";
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginPageComponent, canActivate: [WithoutTokenGuardService] },
  { path: 'cart', component: CartComponent, canActivate: [WithTokenGuardService] },
  { path: 'signup', component: RegisterPageComponent, canActivate: [WithoutTokenGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [WithTokenGuardService] },
  { path: 'search/:searchTerm', component: HomeComponent, canActivate: [WithTokenGuardService] },
  { path: 'profile/settings', component: SettingsComponent, canActivate: [WithTokenGuardService] },
  { path: 'user-dashboard', component: UserDeshboardComponent, canActivate: [WithTokenGuardService] },
  { path: 'admin-dashboard', component: AdminDeshboardComponent, canActivate: [WithTokenGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
