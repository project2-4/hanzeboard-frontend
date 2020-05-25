import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {ErrorPageComponent} from './shared/components/error-page/error-page.component';
import {IsLoggedInGuard} from "./shared/guards/isLoggedIn.guard";



const routes: Routes = [
  { path: 'login',
    component: LoginComponent,
  },

  { path: '',
    canActivate: [IsLoggedInGuard],
    loadChildren: () => import('./pages/boards/boards.module').then(m => m.BoardsModule)
  },

  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
