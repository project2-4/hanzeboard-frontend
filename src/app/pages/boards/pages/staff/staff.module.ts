import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import {RouterModule} from "@angular/router";
import {StaffRoutingModule} from "./staff-routing.module";

@NgModule({
  declarations: [StaffComponent],
  imports: [
    CommonModule,
    RouterModule,
    StaffRoutingModule
  ]
})
export class StaffModule { }
