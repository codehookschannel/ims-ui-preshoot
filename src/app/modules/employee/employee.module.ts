import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [EmpDashboardComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
  ]
})
export class EmployeeModule { }
