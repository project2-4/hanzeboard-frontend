import {Injectable} from "@angular/core";
import {HttpInterceptor, HttpRequest, HttpHandler} from "@angular/common/http";
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthTokenInjectInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let headers = {};

    if (!req.headers.has('Content-Type')) {
      headers['Content-Type'] = 'application/json';
    }

    headers['Authorization'] = `Bearer ${this.authService.getToken()}`;

    // Request is readonly so it needs to be cloned
    req = req.clone({
      setHeaders: {Authorization: `Bearer ${this.authService.getToken()}`}
    });

    return next.handle(req);
  }
}
