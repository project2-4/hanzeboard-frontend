import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

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

  login(email: string, password: string): Observable<boolean> {
    this.getJWTToken(email, password);
    return of(this.error).pipe(delay(2500), tap(val => { if (!this.error) { this.isLoggedIn = true; }} ));
  }

  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  getJWTToken(email: string, password: string) {
    this.http.post<any>('http://127.0.0.1:8000/api/auth/login',
      { email, password }).subscribe({
      next: (data) => { localStorage.setItem('jwt', JSON.stringify(data as object)); this.error = false; },
      error: () => this.error = true
    });
  }

  getError(): boolean {
    return this.error;
  }

  checkLoggedIn() {
    return (JSON.parse(localStorage.getItem('jwt')).expires_in as number > 0 && this.isLoggedIn);
  }

  getLoggedIn(){
    return this.isLoggedIn;
  }
}
