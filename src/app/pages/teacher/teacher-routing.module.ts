import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthenticationGuard} from '../../shared/guards/authentication.guard';
import {TeacheroverviewComponent} from './teacheroverview/teacheroverview.component';
import {TeacherComponent} from './teacher/teacher.component';


const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: TeacheroverviewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
