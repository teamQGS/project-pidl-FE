import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {CartComponent} from "./cart/cart.component";
import {SignupComponent} from "./signup/signup.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'signup', component: SignupComponent }
]
