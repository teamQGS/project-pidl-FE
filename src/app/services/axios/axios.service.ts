import { Injectable } from '@angular/core';
import axios from 'axios';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {jwtDecode, JwtPayload} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor(private router: Router, private snackBar: MatSnackBar) {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.post["Content-Type"] = 'application/json';
  }

  getAuthToken():string | null{
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token: string | null) {
    if (token != null) {
      window.localStorage.setItem("auth_token", token);
      const decodedToken: JwtPayload | undefined = jwtDecode(token);
      // @ts-ignore
      const tokenExpirationDate = new Date(decodedToken.exp * 1000);
      window.localStorage.setItem("auth_token_expiration", tokenExpirationDate.toString());
      //console.log("Token expiration: " + tokenExpirationDate);
    } else {
      window.localStorage.removeItem("auth_token");
      window.localStorage.removeItem("auth_token_expiration");
    }
  }

  checkTokenExpiration() {
    const expirationTime = window.localStorage.getItem("auth_token_expiration");
    if (expirationTime !== null) {
      const currentTime = new Date().getTime();
      if (parseInt(expirationTime) < currentTime) {
        console.log("The Token has expired")
        window.localStorage.clear();
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
