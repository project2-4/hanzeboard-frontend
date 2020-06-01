import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-report-absent',
  templateUrl: './report-absent.component.html',
  styleUrls: ['./report-absent.component.scss']
})
export class ReportAbsentComponent implements OnInit {

  public staff: Array<any> = [];
  public untillDate;

  constructor(private httpClient: HttpClient) { }

  async ngOnInit() {
    this.staff = await this.httpClient.get<any>(`${environment.apiEndpoint}/staff`).pipe(
      map(response => {
        return response.message;
      })
    ).toPromise();

  }

}
