import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AxiosService} from "../axios/axios.service";


@Injectable({
  providedIn: 'root'
})
export class WithTokenGuardService implements CanActivate {

  constructor(private axiosService: AxiosService, private router: Router) {}

  canActivate(): boolean {
    if (this.axiosService.getAuthToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
