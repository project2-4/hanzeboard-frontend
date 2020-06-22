import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-assignments',
  templateUrl: './edit-assignments.component.html',
  styleUrls: ['./edit-assignments.component.scss']
})
export class EditAssignmentsComponent implements OnInit {

  public name = '';
  public credits = '5';
  public deadline: any = '';


  public courseId;
  public subjectId;
  public assigmentId;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private router: Router) { }

  async ngOnInit () {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.subjectId = this.route.snapshot.paramMap.get('subjectId');
    this.assigmentId = this.route.snapshot.paramMap.get('assignmentId');

    const assigment = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses/${this.courseId}/subjects/${this.subjectId}/assignments/${this.assigmentId}`).pipe(
      map(response => {
        return response.message;
      })
    ).toPromise();

    this.name = assigment.name;
    this.credits = assigment.credits;
    this.deadline = assigment.deadline_formatted;
  }

  public async submit() {
    try {
      await this.httpClient.put<any>(`${environment.apiEndpoint}/courses/${this.courseId}/subjects/${this.subjectId}/assignments/${this.assigmentId}`, {
        name: this.name,
        type: 'open',
        credits: this.credits,
        deadline: `${this.deadline}`
      }).toPromise();

      await this.router.navigate([`/staff/manage-subjects/${this.courseId}/subjects/${this.subjectId}/assignments-overview`]);
    } catch (e) {
      if (e.error.message) {
        Swal.fire({icon: 'error', title: 'Oops...', text: e.error.message});
      }
    }
  }

}
