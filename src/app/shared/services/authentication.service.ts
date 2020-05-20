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

  isLoggedIn: boolean;
  error: any;
  jwt: object;

  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedIn = false;
  }

  login(email: string, password: string): Observable<JWTToken> {
    return this.http.post<JWTToken>('http://127.0.0.1:8000/api/auth/login', { email, password }) as Observable<JWTToken>;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  checkLoggedIn() {
    return (JSON.parse(localStorage.getItem('jwt')).expires_in as number > 0 && this.isLoggedIn);
  }

  getLoggedIn(){
    return this.isLoggedIn;
  }
}
