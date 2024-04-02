import { Component } from '@angular/core';
import {LoginComponent} from "../login-form/login.component";
import {AxiosService} from "../services/axios/axios.service";

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
  constructor(private axiosService: AxiosService) {}
  onLogin(input: any){
    this.axiosService.request(
      "POST",
      "/api/users/login",
      {email: input.email,
      password: input.password}
    ).then(response => {
      this.axiosService.setAuthToken(response.data.token);
    })
  }
}
