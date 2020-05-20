import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-error-page',
  template: `
    <div class="page-wrap d-flex flex-row align-items-center">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-12 text-center">
            <span class="display-1 d-block">404</span>
            <div class="mb-4 lead">The page you are looking for was not found.</div>
            <a routerLink="/dashboard" class="btn btn-link">Go Back</a>
          </div>
        </div>
      </div>
    </div>`
})
export class ErrorPageComponent implements OnInit {

  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
