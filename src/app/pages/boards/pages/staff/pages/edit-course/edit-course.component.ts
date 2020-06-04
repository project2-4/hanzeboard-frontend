import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import {map} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  public amountOfSubjects: number = 3;

  public staff: Array<any>;
  public groups: Array<any>;
  public students: Array<any>;

  public name: string = '';
  public staffOutput: Array<any> = [];
  public groupsOutput: Array<any> = [];
  public studentsOutput: Array<any> = [];
  public subjects: Array<string> = [];

  private courseId;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    const course = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses/${this.courseId}`).pipe(
      map(response => {
        return response.message;
      })
    ).toPromise();

    this.name = course.name;

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
    this.groups = e.map(val => val.id);
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
      await this.httpClient.put<any>(`${environment.apiEndpoint}/courses/${this.courseId}`, {
        name: this.name,
        staff_ids: [],
        group_ids: [],
        student_ids: [],
        subjects: [],
        is_public: 1
      }).toPromise();

      await this.router.navigate(['/staff/courses/overview']);
    } catch (e) {
      if (e.error.message) {
        alert(e.error.message);
      }
    }
  }

}
