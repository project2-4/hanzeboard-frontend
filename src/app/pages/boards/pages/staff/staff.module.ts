import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import {RouterModule} from "@angular/router";
import {StaffRoutingModule} from "./staff-routing.module";
import { CourseOverviewComponent } from './pages/course-overview/course-overview.component';
import {MatTableModule} from "@angular/material/table";
import { AddCourseComponent } from './pages/add-course/add-course.component';
import {SharedModule} from "../../../../shared/shared.module";
import { ImportGradesComponent } from './pages/import-grades/import-grades.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import { ReportSicknessComponent } from './pages/report-sickness/report-sickness.component';

import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [StaffComponent, CourseOverviewComponent, AddCourseComponent, ImportGradesComponent, ReportSicknessComponent],
  imports: [
    CommonModule,
    RouterModule,
    StaffRoutingModule,
    MatTableModule,
    SharedModule,
    NgxDropzoneModule,
    FormsModule,
    NgbModule
  ],
})
export class StaffModule { }
