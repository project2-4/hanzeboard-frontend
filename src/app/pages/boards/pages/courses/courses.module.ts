import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {CoursesRoutingModule} from './courses-routing.module';

import { CoursesComponent } from './courses.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTableModule} from '@angular/material/table';
import {SharedModule} from '../../../../shared/shared.module';

@NgModule({
  declarations: [CoursesComponent, SubjectComponent, AnnouncementsComponent, TeachersComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    RouterModule,
    NgbCollapseModule,
    MatTableModule,
    SharedModule
  ]
})
export class CoursesModule { }
