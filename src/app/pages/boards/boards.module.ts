import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { BoardComponent } from './board/board.component';
import {SharedModule} from '../../shared/shared.module';
import {DashboardOverviewComponent} from './pages/dashboard-overview/dashboard-overview.component';
import {CoursesModule} from './pages/courses/courses.module';
import {GradesModule} from './pages/grades/grades.module';
import {StaffModule} from './pages/staff/staff.module';
import {IsStaffGuard} from '../../shared/guards/is-staff.guard';


@NgModule({
  declarations: [BoardComponent, DashboardOverviewComponent],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    SharedModule,
    CoursesModule,
    GradesModule,
    StaffModule
  ]
})
export class BoardsModule { }
