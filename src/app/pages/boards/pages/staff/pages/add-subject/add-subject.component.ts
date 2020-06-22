import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent {
  public name: string = '';

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private router: Router) { }

  public async submit() {
    const courseId = this.route.snapshot.paramMap.get('courseId');

    try {
      await this.httpClient.post<any>(`${environment.apiEndpoint}/courses/${courseId}/subjects`, {
        name: this.name,
        page_content: this.name,
        page_name: this.name
      }).toPromise();

      await this.router.navigate(['/staff/manage-subjects/' + courseId]);
    } catch (e) {
      if (e.error.message) {
        Swal.fire({icon: 'error', title: 'Oops...', text: e.error.message});
      }
    }
  }
}
