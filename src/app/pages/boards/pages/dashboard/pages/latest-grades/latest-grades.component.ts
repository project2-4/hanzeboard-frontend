import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-latest-grades',
  templateUrl: './latest-grades.component.html',
  styleUrls: ['./latest-grades.component.scss']
})
export class LatestGradesComponent implements OnInit {

  grades = [];

  constructor(private httpClient: HttpClient) { }

  async ngOnInit() {
    this.grades = await this.retrieveGrades();
  }

  async retrieveGrades() {
    const request = await this.httpClient.get<any>(`${environment.apiEndpoint}/grades`).toPromise();

    request.message.forEach((element) => {
      element.active = false;
    });

    return request.message;
  }

}
