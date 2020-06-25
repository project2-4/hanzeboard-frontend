import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {AppModule} from "../../../../../../app.module";

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
    Swal.fire(AppModule.SWAL_CONFIRM).then(async (result) => {
      if (result.value) {
        try {
          await this.httpClient.post<any>(`${environment.apiEndpoint}/courses/${this.courseId}/announcements`, {
            title: this.title,
            content: this.content
          }).toPromise().then(() => {
            Swal.fire(
              'Aangemaakt!',
              'Je hebt met succes een announcement aangemaakt!',
              'success'
            );
          });

          await this.router.navigate(['/staff']);
        } catch (e) {
          if (e.error.message) {
            Swal.fire({icon: 'error', title: 'Oops...', text: e.error.message + ' ' + e.error.errors.content[0]});
          }
        }
      }
    });
  }
}
