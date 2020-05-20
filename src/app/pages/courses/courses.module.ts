import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesoverviewComponent } from './coursesoverview/coursesoverview.component';


@NgModule({
  declarations: [CoursesoverviewComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule { }
