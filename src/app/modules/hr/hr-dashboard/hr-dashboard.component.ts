import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../shared/services/interview.service';
import { DashboardService } from '../../shared/services/dashboard.service';
import { InterviewStatus } from '../../custom-types';

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss']
})
export class HrDashboardComponent implements OnInit {

  cardData;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void { 
    this.dashboardService.loadByStatus().subscribe(response => {
      this.cardData = response.data;
    });
  }

  getCardStyle(card) {
    let style = 'count-card';

    switch (card.status) {
      case InterviewStatus.SCHEDULED : style += ' scheduled-card'; break;
      case InterviewStatus.UNDER_PROCESS : style += ' selected-card'; break;
      case InterviewStatus.REJECTED : style += ' rejected-card'; break;
    }

    return style;
  }

}
