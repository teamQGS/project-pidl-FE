import { Component } from '@angular/core';
import {LoginComponent} from "../login-form/login.component";
import {AxiosService} from "../services/axios/axios.service";
import {SignupComponent} from "../signup-form/signup.component";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    LoginComponent,
    SignupComponent
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  constructor(private axiosService: AxiosService) {
  }

  onRegister(input: any) {
    this.axiosService.request(
      "POST",
      "/api/users/signup",
      {
        email: input.email,
        username: input.username,
        password: input.password
      }
    ).then(response => {
      this.axiosService.setAuthToken(response.data.token);
    })
  }
}
