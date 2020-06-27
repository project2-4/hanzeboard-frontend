import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import Swal from "sweetalert2";
import {UserService} from "../../../../../../shared/services/user.service";

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

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private router: Router,
              private user: UserService) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type');
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
      await this.user.create(this.type, body);
      await this.router.navigate(['/staff/user-management']);
    } catch (e) {
      if (e.error.message) {
        Swal.fire({icon: 'error', title: 'Oops... gegeven data is niet valide. ' + e.error.errors[Object.keys(e.error.errors)[0]]});
      }
    }
  }
}
