import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public authService: AuthenticationService,
              public router: Router) {
  }

  ngOnInit(): void { }
}
