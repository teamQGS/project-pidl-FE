import { Injectable } from '@angular/core';
import axios from 'axios';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor(private router: Router, private snackBar: MatSnackBar, private authService: AuthService) {
    // axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.baseURL = 'https://project-pidl-be.onrender.com';

    axios.defaults.headers.post["Content-Type"] = 'application/json';
  }

  getAuthToken():string | null{
    return this.authService.getAuthToken();
  }

  setAuthToken(token: string | null) {
    this.authService.setAuthToken(token);
  }

  checkTokenExpiration() {
    const expirationTime = window.localStorage.getItem("auth_token_expiration");
    if (expirationTime !== null) {
      const currentTime = new Date().getTime();
      // console.log(parseInt(expirationTime));
      // console.log(currentTime);
      if (parseInt(expirationTime) < currentTime) {
        console.log("The Token has expired")
        this.authService.logoutUser();
        this.router.navigate(['/login']).then(r => this.snackBar.open("The Token has expired, log in again please", '', {
          duration: 3000
        }));

      }
    }
  }



  request(method: string, url: string, data: any): Promise<any> {
    let headers = {}
    this.checkTokenExpiration();

    if(this.getAuthToken() !== null) {
      headers = {"Authorization": "Bearer " + this.getAuthToken()}
    }

    return  axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    })
  }
}
