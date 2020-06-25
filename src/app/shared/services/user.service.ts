import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  async save(type: string, body: any) {
    return await this.httpClient.post<any>(`${environment.apiEndpoint}/${type}`, body).toPromise();
  }

  async create(type: string, body: any) {
    return await this.httpClient.post<any>(`${environment.apiEndpoint}/${type}`, body).toPromise();
  }
}
