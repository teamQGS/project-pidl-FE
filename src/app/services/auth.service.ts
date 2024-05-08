import { Injectable } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = new BehaviorSubject<boolean>(this.checkInitialLogin());

  getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  setAuthToken(token: string | null): void {
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      if (decodedToken.exp) {
        const expirationDate = new Date(decodedToken.exp * 1000).getTime();
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_token_expiration', expirationDate.toString());
        this.setAuthStatus(true);
      } else {
        this.logoutUser();  // Logout if no expiration is present
      }
    } else {
      this.logoutUser();
    }
  }

  isTokenExpired(): boolean {
    const expirationTime = localStorage.getItem('auth_token_expiration');
    return !expirationTime || parseInt(expirationTime) < Date.now();
  }

  private checkInitialLogin(): boolean {
    return !this.isTokenExpired() && !!this.getAuthToken();
  }

  setAuthStatus(value: boolean): void {
    this.loggedInStatus.next(value);
  }

  loginUser(token: string): void {
    this.setAuthToken(token); // Consolidate token handling
  }

  logoutUser(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_token_expiration');
    localStorage.clear();
    this.loggedInStatus.next(false);
  }

  get isLoggedIn() {
    return this.loggedInStatus.asObservable();
  }
}
