import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../../../environments/environment';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  public course: number;
  public staff = [];
  public columnsToDisplay = ['full_name', 'office_location', 'status'];

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.course = parseInt(this.route.parent.snapshot.paramMap.get('course'), 10);

    this.staff = await this.loadStaff();
  }

  async loadStaff() {
    const request = await this.httpClient.get<any>(`${environment.apiEndpoint}/courses/${this.course}/staff/`).toPromise();

    return request.message;
  }

}
