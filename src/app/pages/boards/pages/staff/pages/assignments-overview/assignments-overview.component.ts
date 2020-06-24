import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import {map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import { faTrashAlt, faEdit, faFileExport } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

@Component({
  selector: 'app-assignments-overview',
  templateUrl: './assignments-overview.component.html',
  styleUrls: ['./assignments-overview.component.scss']
})
export class AssignmentsOverviewComponent implements OnInit {

  public assigments = [];

  public columnsToDisplay = ['name', 'credits', 'actions'];

  public courseId;
  public subjectId;

  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faFileExport = faFileExport;


  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.subjectId = this.route.snapshot.paramMap.get('subjectId');
    this.assigments = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses/${this.courseId}/subjects/${this.subjectId}/assignments`).pipe(
      map(response => {
        return response.message;
      })
    ).toPromise();
  }

  public async deleteCourse(id) {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    const subjectId = this.route.snapshot.paramMap.get('subjectId');

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
        await this.httpClient.delete(`${environment.apiEndpoint}/courses/${courseId}/subjects/${subjectId}/assignments/${id}`).toPromise();
        this.assigments = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses/${courseId}/subjects/${subjectId}/assignments`)
          .pipe(
            map(response => {
              return response.message;
            })
          ).toPromise();
      }
    }).then(() => {
      Swal.fire(
        'Verwijderd!',
        'Course met succes verwijderd.',
        'success'
      );
    });
  }

}
