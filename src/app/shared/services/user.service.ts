import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  async save(type: string, body: any, id: string) {
    if(type === 'student') {
      type = 'students';
    }

    return await this.httpClient.put<any>(`${environment.apiEndpoint}/${type}/${id}`, body).toPromise();
  }

  async create(type: string, body: any) {
    if(type === 'student') {
      type = 'students';
    }

    return await this.httpClient.post<any>(`${environment.apiEndpoint}/${type}`, body).toPromise();
  }
}
