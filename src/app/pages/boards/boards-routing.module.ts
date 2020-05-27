import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BoardComponent} from "./board/board.component";
import {DashboardOverviewComponent} from "./pages/dashboard-overview/dashboard-overview.component";
import {CoursesComponent} from "./pages/courses/courses.component";
import {GradesComponent} from "./pages/grades/grades.component";
import {StaffComponent} from "./pages/staff/staff.component";
import {IsStaffGuard} from '../../shared/guards/is-staff.guard';


const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
    children: [
      {
        path: '',
        component: DashboardOverviewComponent
      },
      {
        path: 'courses',
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardsRoutingModule { }
