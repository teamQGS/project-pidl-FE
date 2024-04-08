import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login-form/login.component";
import {CartComponent} from "./cart/cart.component";
import {SignupComponent} from "./registration/signup-form/signup.component";
import {ProfileComponent} from "./profile/profile.component";
import {HomeComponent} from "./home/home.component";
import {LoginPageComponent} from "./login/login-page/login-page.component";
import {RegisterPageComponent} from "./registration/register-page/register-page.component";
import {SettingsComponent} from "./profile/settings/settings.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'signup', component: RegisterPageComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'search/:searchTerm', component: HomeComponent},
  { path: 'profile/settings', component: SettingsComponent}
]
