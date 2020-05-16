import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './shared/services/authentication/login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard/dashboard.component';
import {ErrorPageComponent} from './shared/components/error-page/error-page.component';
import {AuthenticationGuard} from './shared/services/authentication/authentication.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
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
