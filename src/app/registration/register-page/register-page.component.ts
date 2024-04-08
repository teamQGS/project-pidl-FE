import { Component } from '@angular/core';
import {LoginComponent} from "../../login/login-form/login.component";
import {AxiosService} from "../../services/axios/axios.service";
import {SignupComponent} from "../signup-form/signup.component";
import {Router} from "@angular/router";

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
  constructor(private axiosService: AxiosService, private router: Router) {
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
      this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/profile']);
      });
    })
  }
}
