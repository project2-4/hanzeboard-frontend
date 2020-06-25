import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { }

  async getStaff() {
    return await this.httpClient.get<any>(`${environment.apiEndpoint}/staff`).pipe(
      map(response => {
        return response.message;
      })
    ).toPromise();
  }

  async getGroups() {
    return await this.httpClient.get<any>(`${environment.apiEndpoint}/groups`).pipe(
      map(response => {
        return response.message;
      })
    ).toPromise()
  }

  async getStudents() {
    return await this.httpClient.get<any>(`${environment.apiEndpoint}/students`).pipe(
      map(response => {
        return response.message;
      })
    ).toPromise()
  }

}
