import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthenticationGuard} from '../../shared/guards/authentication.guard';
import {CoursesoverviewComponent} from './coursesoverview/coursesoverview.component';
import {CoursesComponent} from './courses/courses.component';


const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: CoursesoverviewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
