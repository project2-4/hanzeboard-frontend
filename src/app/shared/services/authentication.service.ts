import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

export interface JWTToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  /**
   * Holds the current JWT token
   */
  private jwt: JWTToken = null;

  constructor(private http: HttpClient, private router: Router) {
    if(localStorage.getItem('jwt') !== null) {
      this.jwt = JSON.parse(localStorage.getItem('jwt'));
    }
  }

  /**
   * Login on the backend using email and password
   *
   * @param email
   * @param password
   */
  public async login(email: string, password: string): Promise<boolean> {
    try {
      this.jwt = await this.http.post<JWTToken>('http://127.0.0.1:8000/api/auth/login', { email, password }).toPromise();
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Log the user out
   *
   * TODO: invalidate JWT Token
   */
  public logout() {
    localStorage.removeItem('jwt');
    this.jwt = null;
    this.router.navigate(['/login']);
  }

  /**
   * Get access token
   */
  public get accessToken() {
    return this.jwt.access_token;
  }

  /**
   * Check if the user is logged in
   */
  public get isLoggedIn() {
    return this.jwt !== null;
  }
}
