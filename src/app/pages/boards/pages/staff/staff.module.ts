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

import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ManageSubjectsComponent } from './pages/manage-subjects/manage-subjects.component';
import { AddSubjectComponent } from './pages/add-subject/add-subject.component';
import { EditSubjectComponent } from './pages/edit-subject/edit-subject.component';
import { EditCourseComponent } from './pages/edit-course/edit-course.component';
import { ReportAbsentComponent } from './pages/report-absent/report-absent.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { AddAnnoucementComponent } from './pages/add-annoucement/add-annoucement.component';
import { AssignmentsOverviewComponent } from './pages/assignments-overview/assignments-overview.component';
import { AddAssignmentsComponent } from './pages/add-assignments/add-assignments.component';
import { EditAssignmentsComponent } from './pages/edit-assignments/edit-assignments.component';


@NgModule({
  declarations: [StaffComponent, CourseOverviewComponent, AddCourseComponent, ImportGradesComponent, ManageSubjectsComponent, AddSubjectComponent, EditSubjectComponent, EditCourseComponent, ReportAbsentComponent, UserManagementComponent, AddUserComponent, EditUserComponent, AddAnnoucementComponent, AssignmentsOverviewComponent, AddAssignmentsComponent, EditAssignmentsComponent],
  imports: [
    CommonModule,
    RouterModule,
    StaffRoutingModule,
    MatTableModule,
    SharedModule,
    NgxDropzoneModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule
  ],
})
export class StaffModule { }
