import { Component } from '@angular/core';
import {LoginComponent} from "../login-form/login.component";
import {AxiosService} from "../../services/axios/axios.service";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    LoginComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  constructor(private axiosService: AxiosService, private router: Router) {}
  onLogin(input: any){
    this.axiosService.request(
      "POST",
      "/api/users/login",
      {email: input.email,
      password: input.password}
    ).then(response => {
      this.axiosService.setAuthToken(response.data.token);
      this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/profile']);
      });
    }).catch(error => {
      console.log('error');
    });
  }
}
