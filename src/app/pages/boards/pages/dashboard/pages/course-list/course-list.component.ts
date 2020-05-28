import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../../environments/environment';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  pageList: any;

  public columnsToDisplay = ['name'];

  public courses = [];

  constructor(private httpClient: HttpClient) {
    this.pageList = [10, 20, 30, 40];
  }

  async ngOnInit() {
    const request = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses`).toPromise();
    this.courses = request.message;
  }

}
