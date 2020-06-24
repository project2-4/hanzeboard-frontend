import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  type = 'student'
  firstName = '';
  infix = '';
  lastName = '';
  email = '';

  abbreviation = '';
  officeLocation = '';

  studentNumber = '';

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type');
  }

  public async submit() {
    if(this.type === 'staff') {
      try {
        await this.httpClient.post<any>(`${environment.apiEndpoint}/staff`, {
          first_name: this.firstName,
          infix: this.infix,
          email: this.email,
          last_name: this.lastName,
          role_id: 1,
          abbreviation: this.abbreviation,
          office_location: this.officeLocation
        }).toPromise();

        await this.router.navigate(['/staff/user-management']);
      } catch (e) {
        if (e.error.message) {
          Swal.fire({icon: 'error', title: 'Oops...', text: e.error.message});
        }
      }
    } else if(this.type === 'student') {
      try {
        await this.httpClient.post<any>(`${environment.apiEndpoint}/students`, {
          first_name: this.firstName,
          infix: this.infix,
          email: this.email,
          last_name: this.lastName,
          role_id: 1,
          student_number: this.studentNumber,
        }).toPromise();

        await this.router.navigate(['/staff/user-management']);
      } catch (e) {
        if (e.error.message) {
          Swal.fire({icon: 'error', title: 'Oops...', text: e.error.message});
        }
      }
    }
  }
}
