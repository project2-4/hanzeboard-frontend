import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  getProfileType(): string{
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    return jwt_decode(jwt.access_token).profile.toLowerCase();
  }
}
