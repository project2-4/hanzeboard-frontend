import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CourseDetailsComponent} from './pages/course-details/course-details';
import {AnnouncementsComponent} from './pages/course-details/pages/announcements/announcements.component';
import {SubjectComponent} from './pages/course-details/pages/subject/subject.component';
import {TeachersComponent} from './pages/course-details/pages/teachers/teachers.component';

const routes: Routes = [
  {
    path: '',
    component: CourseDetailsComponent,
    children: [
      {
        path: ':id/announcements',
        component: AnnouncementsComponent
      },
      {
        path: ':id/teachers',
        component: TeachersComponent
      },
      {
        path: ':id/:codes',
        component: SubjectComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
