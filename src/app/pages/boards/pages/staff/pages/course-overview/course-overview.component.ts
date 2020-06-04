import { Component, OnInit } from '@angular/core';
import {map} from "rxjs/operators";
import {environment} from '../../../../../../../environments/environment';
import { faTrashAlt, faEdit, faTasks, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.scss']
})
export class CourseOverviewComponent implements OnInit {

  public courses = [];

  public columnsToDisplay = ['name', 'actions'];

  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faTasks = faTasks;
  faBullhorn = faBullhorn;

  constructor(private httpClient: HttpClient) { }

  async ngOnInit() {
    const request = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses`).toPromise();
    this.courses = request.message;
  }

  public async deleteCourse(id) {
    if(confirm('Weet u het zeker?')) {
      await this.httpClient.delete(`${environment.apiEndpoint}/courses/${id}`).toPromise();
      this.courses = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses`).pipe(
        map(response => response.message)
      ).toPromise();
    }
  }

}
