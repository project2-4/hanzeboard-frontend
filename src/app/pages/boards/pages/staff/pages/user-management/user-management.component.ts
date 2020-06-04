import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import {map} from "rxjs/operators";
import { faTrashAlt, faEdit, faTasks } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faTasks = faTasks;

  showType = 'staff';

  staffs = [];
  students = [];

  staffColumns = ['full_name', 'abbreviation', 'office_location', 'actions'];
  studentsColumns = ['full_name', 'student_number', 'actions'];

  constructor(private httpClient: HttpClient) { }

  async ngOnInit() {
    this.staffs = await this.httpClient.get<any>(`${environment.apiEndpoint}/staff`).pipe(
      map(response => response.message)
    ).toPromise();

    this.students = await this.httpClient.get<any>(`${environment.apiEndpoint}/students`).pipe(
      map(response => response.message)
    ).toPromise();
  }

}
