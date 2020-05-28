import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AnnouncementsComponent} from './pages/announcements/announcements.component';
import {SubjectComponent} from './pages/subject/subject.component';
import {TeachersComponent} from './pages/teachers/teachers.component';

const routes: Routes = [
  {
    path: 'announcements',
    component: AnnouncementsComponent
  },
  {
    path: 'teachers',
    component: TeachersComponent
  },
  {
    path: ':subject',
    component: SubjectComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
