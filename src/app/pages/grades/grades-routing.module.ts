import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthenticationGuard} from '../../shared/guards/authentication.guard';
import {GradecenterComponent} from './gradecenter/gradecenter.component';
import {GradesComponent} from './grades/grades.component';


const routes: Routes = [
  {
    path: '',
    component: GradesComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: GradecenterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradesRoutingModule { }
