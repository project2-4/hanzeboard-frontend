import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-course-test',
  templateUrl: './course-details.html',
  styleUrls: ['./course-details.scss']
})
export class CourseDetailsComponent implements OnInit {

  id: string;

  subjects = ['Algorithms and Datastructures', 'OOP3 and Design Patterns', 'Academic Writing', 'Project Software Engineering'];
  codes = ['1', '2', '3', '4'];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const url = this.router.routerState.snapshot.url;
    this.id = url.substring('courses/'.length + 1, url.lastIndexOf('/'));
  }

}
