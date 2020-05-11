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
  message: string;

  constructor(public authService: AuthenticationService,
              public router: Router,
              public formBuilder: FormBuilder) {
    this.setMessage();
  }

  ngOnInit(){
    this.form = this.formBuilder.group({
      username: this.formBuilder.control('', Validators.compose(
        [Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
      password: this.formBuilder.control('', Validators.required)
    });
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login(value) {
    this.message = 'Trying to log in ...';
    console.log('username: ' + value.username);
    console.log('password: ' + value.password);

    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        const redirectUrl = '/dashboard';
        this.router.navigate([redirectUrl]);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
