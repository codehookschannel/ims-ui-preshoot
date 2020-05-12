import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../shared/services/interview.service';
import { DashboardService } from '../../shared/services/dashboard.service';

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss']
})
export class HrDashboardComponent implements OnInit {

  chartData;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void { 
    this.dashboardService.loadByDate().subscribe(response => {

      this.chartData = response.data.reduce((acc, data) => {
        const date = new Date(data.date);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        if (acc.hasOwnProperty(data.status)) {
          acc[data.status].push({
            date,
              value: data.count
          });
        } else {
          acc[data.status] = [
            {
              date,
              value: data.count
            }
          ];
        }
        return acc;
      }, {});

    });
  }

}
