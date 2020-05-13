import { Component, OnInit, ViewChild } from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { TimzoneService } from '../../shared/services/timzone.service';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.scss']
})
export class EmpDashboardComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent; 

  calendarPlugins = [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin];
  viewType = 'dayGridMonth';
  header = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  };

  constructor(
    private timezoneService: TimzoneService
  ) { }

  ngOnInit(): void {
  }

  handleDateClick(event) {
    console.log(event);
  }

  clickTime() { this.viewType = 'timeGridWeek'; }
  clickDay() { this.viewType = 'timeGridDay'; }
  clickWeek() { this.viewType = 'listWeek'; }

}
