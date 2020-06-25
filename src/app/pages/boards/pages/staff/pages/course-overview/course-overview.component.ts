import { Component, OnInit } from '@angular/core';
import {map} from "rxjs/operators";
import {environment} from '../../../../../../../environments/environment';
import { faTrashAlt, faEdit, faTasks, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from "@angular/common/http";
import Swal from "sweetalert2";


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
    Swal.fire({
      title: 'Weet u het zeker?',
      text: 'U kan dit niet terug draaien.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, ik weet het zeker!'
    }).then(async (result) => {
      if (result.value) {
        await this.httpClient.delete(`${environment.apiEndpoint}/courses/${id}`).toPromise();
        this.courses = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses`).pipe(
          map(response => response.message)
        ).toPromise();

        Swal.fire(
          'Verwijderd!',
          'Course met succes verwijderd.',
          'success'
        );
      }
    });
  }
}
