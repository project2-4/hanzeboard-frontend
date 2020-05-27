import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthorizationService} from './authorization.service';

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

  constructor(private http: HttpClient, private router: Router, private authorizationService: AuthorizationService) {
    if (localStorage.getItem('jwt') !== null) {
      // TODO: check if JWT is expired
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
      localStorage.setItem('jwt', JSON.stringify(this.jwt));
      return true;
    } catch (e) {
      console.log(e);
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
