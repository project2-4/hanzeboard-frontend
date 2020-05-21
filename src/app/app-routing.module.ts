import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {ErrorPageComponent} from './shared/components/error-page/error-page.component';
import {AuthenticationGuard} from './shared/guards/authentication.guard';
import {AppComponent} from "./app.component";
import {BoardComponent} from "./pages/boards/board/board.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '',
    canLoad: [AuthenticationGuard],
    loadChildren: () => import('./pages/boards/boards.module').then(m => m.BoardsModule)
  },

  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
