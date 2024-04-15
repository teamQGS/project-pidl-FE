import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.post["Content-Type"] = 'application/json';
  }

  getAuthToken():string | null{
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token: string | null) {
    if (token != null) {
      window.localStorage.setItem("auth_token", token);
      const expirationTime = new Date().getTime() + 3600000;
      window.localStorage.setItem("auth_token_expiration", expirationTime.toString());
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
        window.localStorage.removeItem("auth_token");
        window.localStorage.removeItem("auth_token_expiration");
        window.localStorage.removeItem("username");
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
