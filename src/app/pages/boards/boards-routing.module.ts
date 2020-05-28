import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BoardComponent} from "./board/board.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {CoursesComponent} from "./pages/courses/courses.component";
import {GradesComponent} from "./pages/grades/grades.component";
import {StaffComponent} from "./pages/staff/staff.component";
import {IsStaffGuard} from '../../shared/guards/is-staff.guard';
import {ErrorPageComponent} from '../../shared/components/error-page/error-page.component';


const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'courses/:course',
        component: CoursesComponent,
        loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule)
      },
      {
        path: 'grades',
        component: GradesComponent,
        loadChildren: () => import('./pages/grades/grades.module').then(m => m.GradesModule)
      },
      {
        path: 'staff',
        canActivate: [IsStaffGuard],
        component: StaffComponent,
        loadChildren: () => import('./pages/staff/staff.module').then(m => m.StaffModule)
      }
    ],
  },
  {
    path: '**',
    component: ErrorPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardsRoutingModule { }
