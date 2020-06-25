import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../../environments/environment';
import {map} from 'rxjs/operators';
import { faTrashAlt, faEdit, faTasks } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

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

  async deleteStaff(id) {
    Swal.fire({
      title: 'Weet u het zeker?',
      text: 'U kan dit niet terug draaien.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, ik weet het zeker!'
    }).then(async (result) => {
      if (result.value) {
        await this.httpClient.delete(`${environment.apiEndpoint}/staff/${id}`).toPromise();
        this.staffs = await this.httpClient.get<any>(`${environment.apiEndpoint}/staff`).pipe(
          map(response => response.message)
        ).toPromise();

        Swal.fire(
          'Verwijderd!',
          'Medewerker met succes verwijderd.',
          'success'
        );
      }
    });
  }


  async deleteStudent(id) {
    Swal.fire({
      title: 'Weet u het zeker?',
      text: 'U kan dit niet terug draaien.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, ik weet het zeker!'
    }).then(async (result) => {
      if (result.value) {
        await this.httpClient.delete(`${environment.apiEndpoint}/students/${id}`).toPromise();
        this.students = await this.httpClient.get<any>(`${environment.apiEndpoint}/students`).pipe(
          map(response => response.message)
        ).toPromise();

        Swal.fire(
          'Verwijderd!',
          'Student met succes verwijderd.',
          'success'
        );

      }
    })
  };
}
