import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {FormBuilder, FormGroup} from '@angular/forms';

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
}
