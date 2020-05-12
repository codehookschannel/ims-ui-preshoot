import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { ScheduleInterviewComponent } from './interviews/schedule-interview/schedule-interview.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { AddCandidateComponent } from './candidates/add-candidate/add-candidate.component';
import { InterviewsComponent } from './interviews/interviews.component';


@NgModule({
  declarations: [
    HrDashboardComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    ScheduleInterviewComponent,
    CandidatesComponent,
    AddCandidateComponent,
    InterviewsComponent],
  imports: [
    CommonModule,
    HrRoutingModule,
    SharedModule
  ]
})
export class HrModule { }
