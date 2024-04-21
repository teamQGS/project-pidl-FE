import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const roles = window.localStorage.getItem('role');
    if (roles && roles.includes('CUSTOMER')) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
