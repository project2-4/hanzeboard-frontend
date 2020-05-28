import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  subjectId: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.subjectId = this.getURL();
  }

  getURL(){
    const url = this.router.routerState.snapshot.url;
    const id = url.substring('courses/'.length + 1, url.lastIndexOf('/'));
    return url.substr('courses/'.length + id.length + 2);
  }

}
