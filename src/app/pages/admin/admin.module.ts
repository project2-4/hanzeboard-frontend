import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminoverviewComponent } from './adminoverview/adminoverview.component';
import { AdminComponent } from './admin/admin.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [AdminoverviewComponent, AdminComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ]
})
export class AdminModule { }
