import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-annoucement',
  templateUrl: './add-annoucement.component.html',
  styleUrls: ['./add-annoucement.component.scss']
})
export class AddAnnoucementComponent implements OnInit {

  public title  = '';
  public content = '';

  courseId = '';

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
  }

  public async submit() {
    if(confirm('Weet u het zeker?')) {
      try {
        await this.httpClient.post<any>(`${environment.apiEndpoint}/courses/${this.courseId}/announcements`, {
          title: this.title,
          content: this.content
        }).toPromise();

        await this.router.navigate(['/staff']);
      } catch (e) {
        if(e.error.message) {
          alert(e.error.message);
        }
      }
    }
  }

}
