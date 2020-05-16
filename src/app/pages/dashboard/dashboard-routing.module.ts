import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthenticationGuard} from '../../shared/services/authentication/authentication.guard';
import {DashboardOverviewComponent} from './dashboard-overview/dashboard-overview.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: DashboardOverviewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
