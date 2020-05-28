import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetailsRoutingModule } from './course-details-routing.module';
import { SubjectComponent } from './pages/subject/subject.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { TeachersComponent } from './pages/teachers/teachers.component';


@NgModule({
  declarations: [SubjectComponent, AnnouncementsComponent, TeachersComponent],
  imports: [
    CommonModule,
    CourseDetailsRoutingModule
  ]
})
export class CourseDetailsModule { }
