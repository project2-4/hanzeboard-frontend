import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  roles: string[];

  constructor() {
    this.roles = ['student', 'teacher', 'admin'];
  }

  getRoles(): Observable<string[]>{
    return of(this.roles);
  }
}
