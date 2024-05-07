import { Injectable } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = new BehaviorSubject<boolean>(this.checkInitialLogin());

  setAuthStatus(value: boolean): void {
    this.loggedInStatus.next(value);
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem('auth_token');
  }

  setAuthToken(token: string | null): void {
    if (token) {
      window.localStorage.setItem('auth_token', token);
      const decodedToken: JwtPayload | undefined = jwtDecode(token);
      // @ts-ignore
      const tokenExpirationDate = new Date(decodedToken.exp * 1000).getTime();
      window.localStorage.setItem('auth_token_expiration', tokenExpirationDate.toString());
      this.loginUser(token);
    } else {
      window.localStorage.removeItem('auth_token');
      window.localStorage.removeItem('auth_token_expiration');
    }
  }

  isTokenExpired(): boolean {
    const expirationTime = window.localStorage.getItem('auth_token_expiration');
    if (expirationTime) {
      const currentTime = new Date().getTime();
      return parseInt(expirationTime) < currentTime;
    }
    return true;
  }

  get isLoggedIn() {
    return this.loggedInStatus.asObservable();
  }

  private checkInitialLogin(): boolean {
    return !!localStorage.getItem('auth_token'); 
  }

  loginUser(token: string): void {
    window.localStorage.setItem('auth_token', token);
    this.loggedInStatus.next(true); 
  }

  logoutUser(): void {
    window.localStorage.removeItem('auth_token');
    this.loggedInStatus.next(false); 
  }
}
