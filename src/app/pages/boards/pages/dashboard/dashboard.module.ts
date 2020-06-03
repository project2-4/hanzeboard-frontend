import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { AbsenteesComponent } from './pages/absentees/absentees.component';
import { LatestGradesComponent } from './pages/latest-grades/latest-grades.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SharedModule} from '../../../../shared/shared.module';


@NgModule({
  declarations: [DashboardComponent, CourseListComponent, AbsenteesComponent, LatestGradesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,
    SharedModule
  ]
})
export class DashboardModule { }
