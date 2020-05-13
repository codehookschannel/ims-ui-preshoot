import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: EmpDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
