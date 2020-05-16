import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginError: boolean;

  constructor(public authService: AuthenticationService,
              public router: Router,
              public formBuilder: FormBuilder) {
  }

  ngOnInit(){
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', Validators.compose(
        [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$')])),
      password: this.formBuilder.control('', Validators.required)
    });
  }

  login(value) {
    this.authService.login(value.email, value.password).subscribe(() => {
      if (!this.authService.getError() && this.authService.getLoggedIn()) {
        this.loginError = false;
        this.authService.isLoggedIn = true;
        this.router.navigate(['/dashboard']);
      }
      else{
        this.loginError = true;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
