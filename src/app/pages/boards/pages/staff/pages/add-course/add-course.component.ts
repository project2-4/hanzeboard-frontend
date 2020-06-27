import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {CourseService} from "../../../../../../shared/services/course.service";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  public amountOfSubjects: number = 3;

  public groupsOutput: Array<any> = [];
  public studentsOutput: Array<any> = [];
  public name: string = '';
  public staffOutput: Array<any> = [];
  public subjects: Array<string> = [];

  public staff: Array<any>;
  public groups: Array<any>;
  public students: Array<any>;



  constructor(private httpClient: HttpClient, private router: Router, private courses: CourseService) { }

  async ngOnInit() {
    this.staff = await this.courses.getStaff();
    this.groups = await this.courses.getGroups();
    this.students = await this.courses.getStudents();
  }

  public staffUpdate(e) {
    this.staffOutput = e.map(val => val.id);
  }

  public groupsUpdate(e) {
    this.groupsOutput = e.map(val => val.id);
  }

  public arrayOf(n) {
    return new Array(n);
  }

  public studentsUpdate(e) {
    this.studentsOutput = e.map(val => val.id);
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
        Swal.fire({icon: 'error', title: 'Oops... gegeven data is niet valide. ' + e.error.errors[Object.keys(e.error.errors)[0]]});
      }
    }
  }
}
