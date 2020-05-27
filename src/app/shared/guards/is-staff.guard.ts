import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthorizationService} from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class IsStaffGuard implements CanActivate {

  constructor(private authorizationService: AuthorizationService, private router: Router) {}

  /**
   * Checks if the user belongs to the profile 'staff'
   *
   * @param next
   * @param state
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authorizationService.getProfileType() === 'staff') {
      return true;
    }
    else {
      this.router.navigate(['']);
      return false;
    }
  }

}
