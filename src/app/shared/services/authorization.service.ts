import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  getRole(): string{
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    return jwt_decode(jwt.access_token).role.name.toLowerCase();
  }

  getProfileType(): string{
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    return jwt_decode(jwt.access_token).profile.toLowerCase();
  }
}
