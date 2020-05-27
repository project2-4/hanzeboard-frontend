import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { BoardComponent } from './board/board.component';
import {SharedModule} from '../../shared/shared.module';
import {CoursesModule} from './pages/courses/courses.module';
import {GradesModule} from './pages/grades/grades.module';
import {StaffModule} from './pages/staff/staff.module';


@NgModule({
  declarations: [BoardComponent],
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
