import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanLoad} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import {AuthorizationService} from '../services/authorization.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedInGuard implements CanActivate  {

  constructor(private authService: AuthenticationService,
              private authorService: AuthorizationService,
              private router: Router) {}


  /**
   * Checks if the user can activate this route
   *
   * @param next
   * @param state
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
