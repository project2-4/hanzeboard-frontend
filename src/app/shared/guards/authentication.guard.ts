import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import {AuthorizationService} from '../services/authorization.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {

  previousRoute: string;

  constructor(private authService: AuthenticationService,
              private authorService: AuthorizationService,
              private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.checkLoggedIn()) { return true; }
    this.previousRoute = url;
    this.router.navigate(['/login']);
    return false;
  }
}
