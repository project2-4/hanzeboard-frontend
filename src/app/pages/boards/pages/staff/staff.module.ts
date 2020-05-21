import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import {RouterModule} from "@angular/router";
import {StaffRoutingModule} from "./staff-routing.module";
import { CourseOverviewComponent } from './pages/course-overview/course-overview.component';
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [StaffComponent, CourseOverviewComponent],
  imports: [
    CommonModule,
    RouterModule,
    StaffRoutingModule,
    MatTableModule
  ]
})
export class StaffModule { }
