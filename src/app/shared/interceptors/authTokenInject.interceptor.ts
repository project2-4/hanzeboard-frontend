import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenInjectInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {
  }

  /**
   * Check if the user is logged in, if so add the access token to the Authorization header
   *
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.authService.isLoggedIn) {
      // Request is readonly so it needs to be cloned
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${this.authService.accessToken}`}
      });
    }

    return next.handle(req);
  }
}
