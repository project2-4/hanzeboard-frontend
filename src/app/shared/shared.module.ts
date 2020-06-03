import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HasRoleDirective } from './directives/has-role.directive';
import {RouterModule} from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatHeaderRowDefDirective} from './directives/mat-header-row-def.directive';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { IsStaffDirective } from './directives/is-staff.directive';
import { DragDropSearchComponent } from './components/drag-drop-search/drag-drop-search.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSidenavModule} from '@angular/material/sidenav';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    ErrorPageComponent,
    HasRoleDirective,
    MatHeaderRowDefDirective,
    IsStaffDirective,
    DragDropSearchComponent,
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
    NgbModule,
    DragDropModule,
    MatSidenavModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ErrorPageComponent,
    HasRoleDirective,
    IsStaffDirective,
    DragDropSearchComponent,
    MatHeaderRowDefDirective,
    SidenavComponent,
  ]
})
export class SharedModule { }
