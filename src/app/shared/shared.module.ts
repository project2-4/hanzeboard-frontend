import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HasRoleDirective } from './directives/has-role.directive';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorPageComponent,
    HasRoleDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ErrorPageComponent,
    HasRoleDirective
  ]
})
export class SharedModule { }
