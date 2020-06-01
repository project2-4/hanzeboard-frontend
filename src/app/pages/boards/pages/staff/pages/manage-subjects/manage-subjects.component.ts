import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-manage-subjects',
  templateUrl: './manage-subjects.component.html',
  styleUrls: ['./manage-subjects.component.scss']
})
export class ManageSubjectsComponent implements OnInit {

  public subjects = [];

  public columnsToDisplay = ['name', 'actions'];

  public courseId: string;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    const request = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses/${this.courseId}/subjects`).toPromise();
    this.subjects = request.message;
  }

  public async deleteSubject(id) {
    if(confirm('Weet u het zeker?')) {
      await this.httpClient.delete(`${environment.apiEndpoint}/courses/${this.courseId}/subjects/${id}`).toPromise();
      this.subjects = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses/${this.courseId}/subjects`).pipe(
        map(response => response.message)
      ).toPromise();
    }
  }
}
