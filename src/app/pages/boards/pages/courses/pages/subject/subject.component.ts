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
  public page = [];
  public path;
  public files = [];


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

  loadSubject(subject: number) {
    const url = `${environment.apiEndpoint}/courses/${this.course}/subjects/${subject}`;

    this.httpClient.get<any>(url).toPromise().then((res) => {
      this.data = res.message;
      this.page = res.message.page;
      this.page['items'] = this.page['items'].map(item => {
        if(item.type === 'files') {
          item.content = JSON.parse(item.content);
        }

        return item;
      });

      console.log(this.page);
    });
  }
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
