import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LineComponent } from './modules/shared/charts/line/line.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'hr',
    loadChildren: () => import('./modules/hr/hr.module').then(m => m.HrModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: 'charts',
    component: LineComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
