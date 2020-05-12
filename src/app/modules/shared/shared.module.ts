import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule } from '@angular/forms'; 
import { AppMaterialModule } from 'src/app/app.material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import { CandidateService } from './services/candidate.service';
import { InterviewService } from './services/interview.service';
import { DashboardItemCardComponent } from './dashboard-item-card/dashboard-item-card.component';
import { LineComponent } from './charts/line/line.component';
import { DashboardService } from './services/dashboard.service';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, DashboardItemCardComponent, LineComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    AppMaterialModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    AppMaterialModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
    DashboardItemCardComponent,
    LineComponent
  ],
  providers: [EmployeeService, CandidateService, InterviewService, DashboardService]
})
export class SharedModule { }
