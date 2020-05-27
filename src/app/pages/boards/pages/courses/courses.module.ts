import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailsComponent} from './pages/course-details/course-details';
import {RouterModule} from "@angular/router";
import {CoursesRoutingModule} from "./courses-routing.module";
import { CoursesComponent } from './courses.component';



@NgModule({
  declarations: [CoursesComponent, CourseDetailsComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    RouterModule
  ]
})
export class CoursesModule { }
