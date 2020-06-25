import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import {map} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {CourseService} from "../../../../../../shared/services/course.service";

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

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router, private courses: CourseService) { }

  async ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    const course = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses/${this.courseId}`).pipe(
      map(response => {
        return response.message;
      })
    ).toPromise();

    this.name = course.name;

    this.staff = await this.courses.getStaff();
    this.groups = await this.courses.getGroups();
    this.students = await this.courses.getStudents();
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
        Swal.fire({icon: 'error', title: 'Oops... gegeven data is niet valide. ' + e.error.errors[Object.keys(e.error.errors)[0]]});
      }
    }
  }

}
