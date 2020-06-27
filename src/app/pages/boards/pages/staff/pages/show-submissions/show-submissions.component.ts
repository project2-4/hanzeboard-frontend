import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../../../../environments/environment";
import {map} from "rxjs/operators";
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-show-submissions',
  templateUrl: './show-submissions.component.html',
  styleUrls: ['./show-submissions.component.scss']
})
export class ShowSubmissionsComponent implements OnInit {

  public columnsToDisplay = ['name', 'student_number', 'actions'];
  public submissions;
  public path;

  faDownload = faDownload;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.path = environment.downloads;
    const courseId = this.route.snapshot.paramMap.get('courseId');
    const subjectId = this.route.snapshot.paramMap.get('subjectId');
    const assigmentId = this.route.snapshot.paramMap.get('assignmentId');

    this.submissions = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses/${courseId}/subjects/${subjectId}/assignments/${assigmentId}/submissions`).pipe(
      map(response => {
        return response.message;
      })
    ).toPromise();
  }
}
