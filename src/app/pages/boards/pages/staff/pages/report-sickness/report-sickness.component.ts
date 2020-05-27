import { Component, OnInit } from '@angular/core';
import {faCalendar} from "@fortawesome/free-regular-svg-icons";


@Component({
  selector: 'app-report-sickness',
  templateUrl: './report-sickness.component.html',
  styleUrls: ['./report-sickness.component.scss']
})
export class ReportSicknessComponent implements OnInit {

  public icon = faCalendar;

  public sicknessDate;

  constructor() { }

  ngOnInit(): void {

  }

}
