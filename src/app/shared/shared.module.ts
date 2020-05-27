import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HasRoleDirective } from './directives/has-role.directive';
import {RouterModule} from '@angular/router';
import {DataTableComponent} from './components/data-table/data-table.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatHeaderRowDefDirective} from './directives/mat-header-row-def.directive';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { IsStaffDirective } from './directives/is-staff.directive';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorPageComponent,
    HasRoleDirective,
    DataTableComponent,
    MatHeaderRowDefDirective,
    IsStaffDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ErrorPageComponent,
    HasRoleDirective,
    IsStaffDirective,
    DataTableComponent,
  ]
})
export class SharedModule { }
