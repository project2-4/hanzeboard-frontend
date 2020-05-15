import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './service-modules/authentication/login/login.component';
import {DashboardComponent} from './feature-modules/dashboard/dashboard/dashboard.component';
import {ErrorPageComponent} from './shared/components/error-page/error-page.component';
import {AuthenticationGuard} from './service-modules/authentication/authentication.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    loadChildren: () => import('./feature-modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad: [AuthenticationGuard]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
