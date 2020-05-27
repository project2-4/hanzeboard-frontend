import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-course-test',
  templateUrl: './course-details.html',
  styleUrls: ['./course-details.scss']
})
export class CourseDetailsComponent implements OnInit {

  id: string;

  subjects = ['Algorithms and Datastructures', 'OOP3 and Design Patterns', 'Academic Writing', 'Project Software Engineering'];
  codes = ['2301-ADS', '2302-OOP3', '2303-AW', '2304-PSWE'];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
