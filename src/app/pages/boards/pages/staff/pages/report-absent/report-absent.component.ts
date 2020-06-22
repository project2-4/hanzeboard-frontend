import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-report-absent',
  templateUrl: './report-absent.component.html',
  styleUrls: ['./report-absent.component.scss']
})
export class ReportAbsentComponent implements OnInit {

  public staff: Array<any> = [];
  public untillDate: any = '';
  public selectedStaff = '';
  public selectedReason = '';

  constructor(private httpClient: HttpClient, private router: Router) { }

  async ngOnInit() {
    this.staff = await this.httpClient.get<any>(`${environment.apiEndpoint}/staff`).pipe(
      map(response => {
        return response.message;
      })
    ).toPromise();

  }

  public async submit() {
    try {
      let month = this.untillDate.month;
      let day = this.untillDate.day;

      if(month < 10) {
        month = '0' + month;
      }

      if(day < 10) {
        day = '0' + day;
      }

      await this.httpClient.put(`${environment.apiEndpoint}/staff/${this.selectedStaff}/status`, {
        status: this.selectedReason,
        until: `${this.untillDate.year}-${month}-${day}`
      }).toPromise();

      Swal.fire('Good job!', 'Toegevoegd!', 'success');
      await this.router.navigate(['/staff']);

    } catch (e) {
      Swal.fire({icon: 'error', title: 'Oops...', text: 'Er ging iets mis!'});
    }
  }

}
