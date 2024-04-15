import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AxiosService} from "../axios/axios.service";


@Injectable({
  providedIn: 'root'
})
export class WithoutTokenGuardService implements CanActivate {

  constructor(private axiosService: AxiosService, private router: Router) {}

  canActivate(): boolean {
    if (this.axiosService.getAuthToken()) {
      this.router.navigate(['/profile']);
      return false;
    } else {
      return true;
    }
  }
}
