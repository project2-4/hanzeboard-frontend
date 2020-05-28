import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  public course: number;
  public subject: number;
  public data = [];

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.course = parseInt(this.route.parent.snapshot.paramMap.get('course'), 10);

    // There’s no need to unsubscribe from the paramMap.
    // The ActivatedRoute dies with the routed component.
    this.route.paramMap.subscribe(params => {
      this.subject = parseInt(params.get('subject'), 10);
    });

    const url = `${environment.apiEndpoint}/courses/${this.course}/subjects/${this.subject}`;
    const request = await this.httpClient.get<any>(url).toPromise();

    this.data = request.message;

    console.log(this.data);
  }
}
