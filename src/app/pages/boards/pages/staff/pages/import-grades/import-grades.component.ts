import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-import-grades',
  templateUrl: './import-grades.component.html',
  styleUrls: ['./import-grades.component.scss']
})
export class ImportGradesComponent implements OnInit {

  public courses: Array<any> = [];
  public subjects: Array<any> = [];
  public assignments: Array<any> = [];

  public course: any = 0;
  public subject: any = 0;
  public assignment: any = 0;

  // in app.component.ts
  files: File[] = [];

  constructor(private httpClient: HttpClient, private router: Router) { }

  async ngOnInit() {
    this.courses = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses`).pipe(
      map(response => {
        return response.message;
      })).toPromise();
  }

  async updateSubjects() {
    this.subjects = [];
    this.assignments = [];

    this.subject = 0;
    this.assignment = 0;

    this.subjects = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses/${this.course}/subjects`).pipe(
      map(response => {
        return response.message;
      })).toPromise();
  }

  async updateAssignments() {
    this.assignment = 0;
    this.assignments = [];

    this.assignments = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses/${this.course}/subjects/${this.subject}/assignments`).pipe(
      map(response => {
        return response.message;
      })).toPromise();
  }


  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  async submit() {
    const formData = new FormData();
    formData.append('assignment', this.assignment)
    formData.append('grades', this.files[0]);

    try {
      await this.httpClient.post<any>(`${environment.apiEndpoint}/grades`, formData).toPromise();
      Swal.fire('Goed gedaan!', 'Cijfers zijn geimporteerd!', 'success');

      await this.router.navigate(['/staff']);
    } catch (e) {
      if (e.error.message) {
        Swal.fire({icon: 'error', title: 'Oops... gegeven data is niet valide. ' + e.error.errors[Object.keys(e.error.errors)[0]]});
      }
    }
  }
}
