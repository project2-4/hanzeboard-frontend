import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CourseListComponent} from './pages/course-list/course-list.component';
import {AbsenteesComponent} from './pages/absentees/absentees.component';
import {LatestGradesComponent} from './pages/latest-grades/latest-grades.component';


const routes: Routes = [
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: CourseListComponent,
  },
  {
    path: 'absentees',
    component: AbsenteesComponent,
  },
  {
    path: 'latest-grades',
    component: LatestGradesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
