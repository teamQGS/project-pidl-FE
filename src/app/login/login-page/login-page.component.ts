import { Component } from '@angular/core';
import {LoginComponent} from "../login-form/login.component";
import {AxiosService} from "../../services/axios/axios.service";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  constructor(private axiosService: AxiosService, private router: Router, private snackBar: MatSnackBar) {}
  onLogin(input: any){
    this.axiosService.request(
      "POST",
      "/api/users/login",
      {username: input.username,
      password: input.password}
    ).then(response => {
      this.axiosService.setAuthToken(response.data.token);
      window.localStorage.setItem("username", input.username);
      let role = response.data.role;
      window.localStorage.setItem("role", role);
      this.snackBar.open("Login successfully", '', {
        duration: 3000
      })
      this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/profile']);
      });
    }).catch(error => {
      console.log('error');
      this.snackBar.open("This user doesn't exists", '', {
        duration: 3000
      })

    });
  }
}
