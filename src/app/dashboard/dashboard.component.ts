import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loggedIn: boolean;

  constructor(public authService: AuthenticationService,
              public router: Router) {
    this.loggedIn = true;
  }

  ngOnInit(): void {
    console.log(this.loggedIn);
  }

  logout() {
    this.router.navigate(['/login']);
  }

}
