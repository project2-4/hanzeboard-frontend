import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  role: string;

  constructor() {
    this.role = 'teacher';
  }

  getRoles(): Observable<string>{
    return of(this.role);
  }
}
