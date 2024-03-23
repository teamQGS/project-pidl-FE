import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {CartComponent} from "./cart/cart.component";
import {SignupComponent} from "./signup/signup.component";
import {ProfileComponent} from "./profile/profile.component";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent}
]
