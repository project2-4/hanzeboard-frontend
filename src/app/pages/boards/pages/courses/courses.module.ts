import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseTestComponent } from './pages/course-test/course-test.component';
import {RouterModule} from "@angular/router";
import {CoursesRoutingModule} from "./courses-routing.module";
import { CoursesComponent } from './courses.component';



@NgModule({
  declarations: [CourseTestComponent, CoursesComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    RouterModule
  ]
})
export class CoursesModule { }
