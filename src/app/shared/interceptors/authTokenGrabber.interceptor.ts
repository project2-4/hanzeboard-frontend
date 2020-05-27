import {Injectable} from "@angular/core";
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from "@angular/common/http";
import {AuthenticationService} from "../services/authentication.service";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthTokenGrabberInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const headers = event.headers;
          if(headers.keys().includes('authorization')) {
            // Update token
            this.authService.accessToken = headers.get('authorization').split('Bearer')[1].trim();
          }
        }
        return event;
      })
    );
  }
}
