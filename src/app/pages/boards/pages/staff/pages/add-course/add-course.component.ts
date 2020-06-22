import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  public amountOfSubjects: number = 3;

  public staff: Array<any>;
  public groups: Array<any>;
  public students: Array<any>;

  public name: string = '';
  public staffOutput: Array<any> = [];
  public groupsOutput: Array<any> = [];
  public studentsOutput: Array<any> = [];
  public subjects: Array<string> = [];

  constructor(private httpClient: HttpClient, private router: Router) { }

  async ngOnInit() {
    this.staff = await this.httpClient.get<any>(`${environment.apiEndpoint}/staff`).pipe(
      map(response => {
        return response.message;
      })
    ).toPromise();

    this.groups = await this.httpClient.get<any>(`${environment.apiEndpoint}/groups`).pipe(
      map(response => {
        return response.message;
      })
    ).toPromise()

    this.students = await this.httpClient.get<any>(`${environment.apiEndpoint}/students`).pipe(
      map(response => {
        return response.message;
      })
    ).toPromise()
  }

  public staffUpdate(e) {
    this.staffOutput = e.map(val => val.id);
  }

  public groupsUpdate(e) {
    this.groupsOutput = e.map(val => val.id);
  }

  public studentsUpdate(e) {
    this.studentsOutput = e.map(val => val.id);
  }

  public arrayOf(n) {
    return new Array(n);
  }

  public increaseAmountOfSubjects() {
    this.amountOfSubjects++;
  }

  public async submit() {
    try {
      await this.httpClient.post<any>(`${environment.apiEndpoint}/courses`, {
        name: this.name,
        staff_ids: this.staffOutput,
        group_ids: this.groupsOutput,
        student_ids: this.studentsOutput,
        subjects: this.subjects,
        is_public: 1
      }).toPromise();

      await this.router.navigate(['/staff/courses/overview']);
    } catch (e) {
      if (e.error.message) {
        Swal.fire({icon: 'error', title: 'Oops...', text: e.error.message});
      }
    }
  }
}
