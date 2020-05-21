import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradesComponent } from './grades.component';
import {GradesRoutingModule} from "./grades-routing.module";

@NgModule({
  declarations: [GradesComponent],
  imports: [
    CommonModule,
    GradesRoutingModule
  ]
})
export class GradesModule { }
