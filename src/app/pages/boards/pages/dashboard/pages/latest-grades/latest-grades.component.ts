import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-latest-grades',
  templateUrl: './latest-grades.component.html',
  styleUrls: ['./latest-grades.component.scss']
})
export class LatestGradesComponent implements OnInit {

  grades = [];

  constructor(private httpClient: HttpClient) { }

  async ngOnInit() {
    this.grades = await this.retrieveGrades();
  }

  async retrieveGrades() {
    const request = await this.httpClient.get<any>(`${environment.apiEndpoint}/grades`).toPromise();

    request.message.forEach((element) => {
      element.active = false;
    });

    return request.message;
  }

  getRelativePercentage(list, grade, total): string {
    const usersGrade = Math.floor(grade);
    let count = 0;
    for (const [key, value] of Object.entries(list)){
      if (usersGrade <= Number.parseInt(key, 10)){
        count += value as number;
      }
    }
    if (count === 0){
      return ' Met dit resultaat ben jij de beste student';
    }
    return ' (' + Math.round((count / total as number) * 100) + '%) van de studenten heeft hetzelde of een hoger cijfer behaald.';
  }

}
