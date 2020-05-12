import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HrDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
