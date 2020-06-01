import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../../../../environments/environment";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.scss']
})
export class EditSubjectComponent implements OnInit {

  public name: string = '';

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    const subjectId = this.route.snapshot.paramMap.get('subjectId');
    const subject = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses/${courseId}/subjects/${subjectId}`).pipe(
      map(response => {
        return response.message;
      })
    ).toPromise();

    this.name = subject.name;
  }

  public async submit() {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    const subjectId = this.route.snapshot.paramMap.get('subjectId');

    try {
      await this.httpClient.put<any>(`${environment.apiEndpoint}/courses/${courseId}/subjects/${subjectId}`, {
        name: this.name
      }).toPromise();

      await this.router.navigate(['/staff/manage-subjects/' + courseId]);
    } catch (e) {
      if(e.error.message) {
        alert(e.error.message);
      }
    }
  }

}
