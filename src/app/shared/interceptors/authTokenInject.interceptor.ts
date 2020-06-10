import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenInjectInterceptor implements HttpInterceptor {
  // Semaphore to hold requests when access token is refreshing.
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private isRefreshing = false;

  constructor(private authService: AuthenticationService) {
  }

  /**
   * Check if the user is logged in, if so add the access token to the Authorization header
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Invocation with Cookies (needed for refresh_token)
    req = req.clone({withCredentials: true});

    // Added JWT access token if present
    if (this.authService.isLoggedIn) {
      req = this.addToken(req);
    }

    return next.handle(req).pipe(catchError((exp: any) => {
        if (exp.status === 401 && exp.error.message === 'Unauthenticated') {
          return this.silentRefresh(req, next);
        } else { return throwError(exp); }
      }
    ));
  }

  /**
   * Add access token (JWT) to request
   */
  private addToken(request: HttpRequest<any>) {
    // Request is readonly so it needs to be cloned
    return request.clone({
      setHeaders: {Authorization: `Bearer ${this.authService.accessToken}`}
    });
  }

  /**
   * Try to refresh the access token in the background
   */
  private silentRefresh(req, next): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      // Set lock on semaphore
      this.refreshTokenSubject.next(null);

      // Retrieve new access token
      return this.authService.refreshToken().pipe(
        // New access token received
        switchMap((token: any) => {
          this.isRefreshing = false;
          // Unlock semaphore
          this.refreshTokenSubject.next(token);
          // Handle request again (with new token)
          return next.handle(this.addToken(req));
        }),
        // Refresh token expired
        catchError((exp: any) => {
          return this.refreshTokenExpired();
        })
      );

    } else {
      // Hold requests until new token is retrieved
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        // New access token is received
        switchMap(lock => {
          return next.handle(this.addToken(req));
        }));
    }
  }

  /**
   * Logout user if refresh token is expired
   */
  private refreshTokenExpired(): Observable<any> {
    return of(this.authService.logout());
  }
}
