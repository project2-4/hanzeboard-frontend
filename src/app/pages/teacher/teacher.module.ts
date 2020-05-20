import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacheroverviewComponent } from './teacheroverview/teacheroverview.component';
import { TeacherComponent } from './teacher/teacher.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [TeacheroverviewComponent, TeacherComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    SharedModule
  ]
})
export class TeacherModule { }
