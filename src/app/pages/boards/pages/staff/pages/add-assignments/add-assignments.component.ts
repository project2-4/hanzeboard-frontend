import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-assignments',
  templateUrl: './add-assignments.component.html',
  styleUrls: ['./add-assignments.component.scss']
})
export class AddAssignmentsComponent implements OnInit {

  public name = '';
  public credits = 5;
  public deadline: any = '';


  public courseId;
  public subjectId;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.subjectId = this.route.snapshot.paramMap.get('subjectId');
  }

  public async submit() {
    let month = this.deadline.month;
    let day = this.deadline.day;

    if(month < 10) {
      month = '0' + month;
    }

    if(day < 10) {
      day = '0' + day;
    }

    try {
      await this.httpClient.post<any>(`${environment.apiEndpoint}/courses/${this.courseId}/subjects/${this.subjectId}/assignments`, {
        name: this.name,
        type: 'open',
        credits: this.credits,
        deadline: `${this.deadline.year}-${month}-${day}`
      }).toPromise();

      await this.router.navigate([`/staff/manage-subjects/${this.courseId}/subjects/${this.subjectId}/assignments-overview`]);
    } catch (e) {
      if (e.error.message) {
        Swal.fire({icon: 'error', title: 'Oops...', text: e.error.message + ' ' + e.error.errors.content[0]});
      }
    }
  }

}
