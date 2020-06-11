import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../../environments/environment';
import {Absentee} from './absentee';

@Component({
  selector: 'app-absentees',
  templateUrl: './absentees.component.html',
  styleUrls: ['./absentees.component.scss']
})
export class AbsenteesComponent implements OnInit {

  absentees = [];
  absentee: Absentee;

  constructor(private httpClient: HttpClient) { }

  async ngOnInit() {
    const temp: Absentee[] = await this.retrieveAbsentees();

    for (let i = 0; i < temp.length; i++){
      this.absentee = temp[i];
      if (this.absentee.profile.status.status !== 'available'){
        this.absentees.push(this.absentee);
      }
    }
  }

  async retrieveAbsentees() {
    const request = await this.httpClient.get<any>(`${environment.apiEndpoint}/staff/me`).toPromise();

    request.message.forEach((element) => {
      element.active = false;
    });

    return request.message;
  }

}
