import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.scss']
})
export class CourseOverviewComponent implements OnInit {

  public courses = [];

  public columnsToDisplay = ['name', 'actions'];

  constructor(private httpClient: HttpClient) { }

  async ngOnInit() {
    const request = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses`).toPromise();
    this.courses = request.message;
  }

}
