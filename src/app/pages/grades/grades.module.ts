import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradesRoutingModule } from './grades-routing.module';
import {GradecenterComponent} from './gradecenter/gradecenter.component';
import { GradesComponent } from './grades/grades.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    GradecenterComponent,
    GradesComponent
  ],
  imports: [
    CommonModule,
    GradesRoutingModule,
    SharedModule
  ]
})
export class GradesModule { }
