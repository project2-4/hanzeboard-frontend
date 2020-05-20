import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {ErrorPageComponent} from './shared/components/error-page/error-page.component';
import {AuthenticationGuard} from './shared/guards/authentication.guard';
import {AuthorizationGuard} from './shared/guards/authorization.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad: [AuthenticationGuard]
  },
  { path: 'grades',
    loadChildren: () => import('./pages/grades/grades.module').then(m => m.GradesModule),
    canLoad: [AuthenticationGuard]
  },
  { path: 'courses',
    loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule),
    canLoad: [AuthenticationGuard]
  },
  { path: 'teacher',
    loadChildren: () => import('./pages/teacher/teacher.module').then(m => m.TeacherModule),
    canLoad: [AuthenticationGuard, AuthorizationGuard]
  },
  { path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthenticationGuard, AuthorizationGuard]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
