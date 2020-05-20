import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardOverviewComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class DashboardModule { }
