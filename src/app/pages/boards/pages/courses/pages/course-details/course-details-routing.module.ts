import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubjectComponent} from './pages/subject/subject.component';
import {AnnouncementsComponent} from './pages/announcements/announcements.component';
import {ErrorPageComponent} from '../../../../../../shared/components/error-page/error-page.component';


const routes: Routes = [
  {
    path: '',
    component: SubjectComponent
  },
  {
    path: 'announcements',
    component: AnnouncementsComponent
  },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseDetailsRoutingModule { }
