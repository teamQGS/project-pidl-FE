import { Injectable } from '@angular/core';
import axios from 'axios';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {jwtDecode, JwtPayload} from "jwt-decode";
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor(private router: Router, private snackBar: MatSnackBar, private authService: AuthService) {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.post["Content-Type"] = 'application/json';
  }

  getAuthToken():string | null{
    return this.authService.getAuthToken();
  }

  setAuthToken(token: string | null) {
    this.authService.setAuthToken(token);
  }

  checkTokenExpiration() {
    if(this.authService.isTokenExpired()) {
      console.log("Token expired");
      window.localStorage.clear();
      this.router.navigate(['/login']).then(() => {
        this.snackBar.open('Session expired, log in again please', '', {
          duration: 3000,
        });
        this.authService.logoutUser();
      }
      );
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
