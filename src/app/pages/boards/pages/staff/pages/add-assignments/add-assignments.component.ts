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
    try {
      await this.httpClient.post<any>(`${environment.apiEndpoint}/courses/${this.courseId}/subjects/${this.subjectId}/assignments`, {
        name: this.name,
        type: 'open',
        credits: this.credits,
        deadline: this.deadline
      }).toPromise();

      await this.router.navigate([`/staff/manage-subjects/${this.courseId}/subjects/${this.subjectId}/assignments-overview`]);
    } catch (e) {
      if (e.error.message) {
        Swal.fire({icon: 'error', title: 'Oops... gegeven data is niet valide. ' + e.error.errors[Object.keys(e.error.errors)[0]]});
      }
    }
  }

}
