import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginPageComponent} from "./login/login-page/login-page.component";
import {WithoutTokenGuardService} from "./services/Guard/without-token-guard.service";
import {WithTokenGuardService} from "./services/Guard/with-token-guard.service";
import {CartComponent} from "./cart/cart.component";
import {RegisterPageComponent} from "./registration/register-page/register-page.component";
import {ProfileComponent} from "./profile/profile.component";
import {SettingsComponent} from "./profile/settings/settings.component";
import {NgModule} from "@angular/core";
import {UserDeshboardComponent} from "./user-dashboard/user-deshboard.component";
import {AdminDeshboardComponent} from "./admin-dashboard/admin-deshboard.component";
import {ManagerDashboardComponent} from "./manager-dashboard/manager-dashboard.component";
import {AddProductPageComponent} from "./manager-dashboard/add-product-page/add-product-page.component";
import {AdminGuardService} from "./services/Guard/admin-guard.service";
import {ManagerGuardService} from "./services/Guard/manager-guard.service";
import {CustomerGuardService} from "./services/Guard/customer-guard.service";
import {UpdateUserFormComponent} from "./profile/update-user-form/update-user-form.component";
import {SearchComponent} from "./search/search.component";
import {ChangePasswordFormComponent} from "./profile/change-password-form/change-password-form.component";
import {ContactUsComponent} from "./header/contact-us/contact-us.component";
import {OrderPageComponent} from "./cart/order-page/order-page.component";
import {OrderHistoryComponent} from "./profile/order-history/order-history.component";
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginPageComponent, canActivate: [WithoutTokenGuardService] },
  { path: 'cart', component: CartComponent, canActivate: [WithTokenGuardService] },
  { path: 'signup', component: RegisterPageComponent, canActivate: [WithoutTokenGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [WithTokenGuardService] },
  { path: 'profile/settings', component: SettingsComponent, canActivate: [WithTokenGuardService] },
  { path: 'profile/settings/update', component: UpdateUserFormComponent, canActivate: [WithTokenGuardService] },
  { path: 'profile/settings/changePassword', component: ChangePasswordFormComponent, canActivate: [WithTokenGuardService] },
  { path: 'user-dashboard', component: UserDeshboardComponent, canActivate: [CustomerGuardService] },
  { path: 'admin-dashboard', component: AdminDeshboardComponent, canActivate: [AdminGuardService] },
  { path: 'manager-dashboard', component: ManagerDashboardComponent, canActivate: [ManagerGuardService] },
  { path: 'add-product', component: AddProductPageComponent, canActivate: [WithTokenGuardService] },
  { path: 'search/:searchTerm', component: SearchComponent},
  { path: 'contact-us', component: ContactUsComponent},
  { path: 'order', component: OrderPageComponent, canActivate: [WithTokenGuardService]},
  { path: 'order-history', component: OrderHistoryComponent, canActivate: [WithTokenGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
