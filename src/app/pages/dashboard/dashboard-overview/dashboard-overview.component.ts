import { Component, OnInit } from '@angular/core';
import {CourseItem, DataTableItem} from '../../../shared/components/data-table/data-table-datasource';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent implements OnInit {

  pageList: any;
  columns: any;
  columns1: string[];

  data: DataTableItem[] = [
    {id: 1, name: 'Hydrogen', percentage: '95%'},
    {id: 2, name: 'Helium', percentage: '60%'},
    {id: 3, name: 'Lithium', percentage: '70%'},
    {id: 4, name: 'Beryllium', percentage: '85%'},
    {id: 5, name: 'Boron', percentage: '24%'},
    {id: 6, name: 'Carbon', percentage: '43%'},
    {id: 7, name: 'Nitrogen', percentage: '35%'},
    {id: 8, name: 'Oxygen', percentage: '30%'},
    {id: 9, name: 'Fluorine', percentage: '39%'},
    {id: 10, name: 'Neon', percentage: '20%'},
    {id: 11, name: 'Sodium', percentage: '85%'},
    {id: 12, name: 'Magnesium', percentage: '80%'},
    {id: 13, name: 'Aluminum', percentage: '5%'},
    {id: 14, name: 'Silicon', percentage: '43%'},
    {id: 15, name: 'Phosphorus', percentage: '96%'},
    {id: 16, name: 'Sulfur', percentage: '54%'},
    {id: 17, name: 'Chlorine', percentage: '12%'},
    {id: 18, name: 'Argon', percentage: '64%'},
    {id: 19, name: 'Potassium', percentage: '55%'},
    {id: 20, name: 'Calcium', percentage: '81%'},
  ];

  data1: CourseItem[] = [
    {id: 100, name: 'Mathematics'},
    {id: 101, name: 'Discrete Mathematics'},
    {id: 102, name: 'Linear Algebra'},
    {id: 200, name: 'Chemistry'},
    {id: 201, name: 'Industrial Chemistry'},
    {id: 203, name: 'Bio-Chemistry'},
    {id: 300, name: 'Physics & Astronomy'},
    {id: 400, name: 'Computer Science'},
    {id: 405, name: 'Imperative Programming'},
    {id: 407, name: 'Algorithms and Datastructures'}
  ];

  constructor() {
    this.pageList = [10, 20, 30, 40];
    this.columns = ['id', 'name', 'percentage'];
    this.columns1 = ['id', 'name'];
  }

  ngOnInit(): void {
  }

}
