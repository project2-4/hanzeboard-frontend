import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  public course: number;
  public subject: number;
  public data = [];
  public page = [];
  public path;
  public assigments = {};

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.course = parseInt(this.route.parent.snapshot.paramMap.get('course'), 10);
    this.path = environment.downloads;
    // There’s no need to unsubscribe from the paramMap.
    // The ActivatedRoute dies with the routed component.
    this.route.paramMap.subscribe(params => {
      this.subject = parseInt(params.get('subject'), 10);
      this.loadSubject(this.subject);
    });
  }

  async loadSubject(subject: number) {
    const url = `${environment.apiEndpoint}/courses/${this.course}/subjects/${subject}`;
    this.httpClient.get<any>(url).toPromise().then((res) => {
      this.data = res.message;
      this.page = res.message.page;
      this.page['items'] = this.page['items'].map(item => {
        if (item.type === 'files') {
          item.content = JSON.parse(item.content);
        }

        return item;
      });

      console.log(this.page);
    });

    const assigments =  await this.httpClient.get<any>(`${environment.apiEndpoint}/courses/${this.course}/subjects/${this.subject}/my-submission`).pipe(
      map(r => r.message)
    ).toPromise();
    this.assigments = assigments;
    console.log(this.assigments);
  }

  async upload(event, assigmentId) {
    assigmentId = parseInt(JSON.parse(assigmentId));
    this.assigments[assigmentId] = event.addedFiles[0].name;
    // this.files.push(...event.addedFiles);

    const formData = new FormData();
    formData.append('file', event.addedFiles[0]);

    try {
      await this.httpClient.post<any>(`${environment.apiEndpoint}/courses/${this.course}/subjects/${this.subject}/assignments/${parseInt(assigmentId)}/submissions`, formData).toPromise();
      Swal.fire('Ingeleverd!', 'success');
    } catch (e) {
      if (e.error.message) {
        Swal.fire({icon: 'error', title: 'Oops... gegeven data is niet valide. ' + e.error.errors[Object.keys(e.error.errors)[0]]});
      }
    }

    const assigments =  await this.httpClient.get<any>(`${environment.apiEndpoint}/courses/${this.course}/subjects/${this.subject}/my-submission`).pipe(
      map(r => r.message)
    ).toPromise();
    this.assigments = assigments;
  }
}
