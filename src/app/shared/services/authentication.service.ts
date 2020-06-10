import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthorizationService} from './authorization.service';
import {tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

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
      this.jwt = await this.http.post<JWTToken>(`${environment.apiEndpoint}/api/auth/login`, {
        email,
        password
      }).toPromise();
      localStorage.setItem('jwt', JSON.stringify(this.jwt));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  refreshToken() {
    console.log('refreshing');
    const headers = new HttpHeaders({Authorization: `Bearer ${this.accessToken}`});

    return this.http.post<JWTToken>(
      `${environment.apiEndpoint}/api/auth/refresh`,
      {},
      { headers, withCredentials: true }).pipe(tap((jwt: JWTToken) => {
        console.log('refreshed');
        this.jwt = jwt;
        localStorage.setItem('jwt', JSON.stringify(this.jwt));
    }));
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

  public set accessToken(token: string) {
    if(this.jwt) {
      this.jwt.access_token = token;
      localStorage.setItem('jwt', JSON.stringify(this.jwt));
    }
  }

  /**
   * Check if the user is logged in
   */
  public get isLoggedIn() {
    return this.jwt !== null;
  }
}
