import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import {map} from "rxjs/operators";
import Swal from "sweetalert2";
import {UserService} from "../../../../../../shared/services/user.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  type = 'student'
  firstName = '';
  infix = '';
  lastName = '';
  email = '';

  abbreviation = '';
  officeLocation = '';

  studentNumber = '';

  userId = null;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private router: Router,
              private user: UserService) {}

  async ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
    this.userId = this.route.snapshot.paramMap.get('userId');

    let user;
    if(this.type === 'staff') {
      user = await this.httpClient.get<any>(`${environment.apiEndpoint}/staff/${this.userId}`).pipe(
        map(response => response.message)
      ).toPromise();

      this.abbreviation = user.abbreviation;
      this.officeLocation = user.office_location;
    } else {
      user = await this.httpClient.get<any>(`${environment.apiEndpoint}/students/${this.userId}`).pipe(
        map(response => response.message)
      ).toPromise();

      this.studentNumber = "" + user.student_number;

    }

    this.firstName = user.user.first_name;
    this.infix = user.user.infix;
    this.lastName = user.user.last_name;
    this.email = user.user.email;
  }

  public async submit() {
    let body = {};

    if(this.type === 'student') {
      body = {
        first_name: this.firstName,
        infix: this.infix,
        email: this.email,
        last_name: this.lastName,
        role_id: 1,
        student_number: this.studentNumber
      }
    } else {
      body = {
        first_name: this.firstName,
        infix: this.infix,
        email: this.email,
        last_name: this.lastName,
        role_id: 1,
        abbreviation: this.abbreviation,
        office_location: this.officeLocation
      }
    }

    try {
      await this.user.save(this.type, body, this.userId);
      await this.router.navigate(['/staff/user-management']);
    } catch (e) {
      if (e.error.message) {
        Swal.fire({icon: 'error', title: 'Oops... gegeven data is niet valide. ' + e.error.errors[Object.keys(e.error.errors)[0]]});
      }
    }
  }

}
