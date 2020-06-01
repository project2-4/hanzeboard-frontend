import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manage-subjects',
  templateUrl: './manage-subjects.component.html',
  styleUrls: ['./manage-subjects.component.scss']
})
export class ManageSubjectsComponent implements OnInit {

  public subjects = [];

  public columnsToDisplay = ['name', 'actions'];

  public courseId: string;

  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    const request = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses/${this.courseId}/subjects`).toPromise();
    this.subjects = request.message;
  }
}
