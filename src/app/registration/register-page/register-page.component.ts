import { Component } from '@angular/core';
import {LoginComponent} from "../../login/login-form/login.component";
import {AxiosService} from "../../services/axios/axios.service";
import {SignupComponent} from "../signup-form/signup.component";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  constructor(private axiosService: AxiosService, private router: Router, private snackBar: MatSnackBar) {
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
      let role = response.data.role;
      window.localStorage.setItem("role", role);
      window.localStorage.setItem("username", input.username);
      this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/profile']);
        this.snackBar.open("Registered successfully", '', {
          duration: 3000
        })
      });
    }).catch(error => {
        this.snackBar.open("This username already exists", '', {
          duration:3000
        })
    })
  }
}
