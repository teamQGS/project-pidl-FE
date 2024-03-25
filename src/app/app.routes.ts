import { Routes } from '@angular/router';
import {LoginComponent} from "./login-form/login.component";
import {CartComponent} from "./cart/cart.component";
import {SignupComponent} from "./signup-form/signup.component";
import {ProfileComponent} from "./profile/profile.component";
import {HomeComponent} from "./home/home.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'signup', component: RegisterPageComponent },
  { path: 'profile', component: ProfileComponent}
]
