import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {FormBuilder, FormGroup} from '@angular/forms';
import Swal from "sweetalert2";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public subjects = [];
  public course: number;

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.course = parseInt(this.route.snapshot.paramMap.get('course'), 10);

    const url = `${environment.apiEndpoint}/courses/${this.course}/subjects`;
    const request = await this.httpClient.get<any>(url).toPromise();

    this.subjects = request.message;
  }

  async unenroll() {
    const result = await Swal.fire({
      title: 'Weet u het zeker?',
      text: "Deze actie kan niet ongedaan worden!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ja, uitschrijven'
    });

    if(result.value) {
      try {
        await this.httpClient.delete(`${environment.apiEndpoint}/courses/${this.course}/unenroll`).toPromise();
        await this.router.navigate(['/dashboard']);
      } catch (e) {
        if (e.error.message) {
          Swal.fire({icon: 'error', title: 'Oops...', text: e.error.message + ' ' + e.error.errors.content[0]});
        }
      }
    }
  }
}
