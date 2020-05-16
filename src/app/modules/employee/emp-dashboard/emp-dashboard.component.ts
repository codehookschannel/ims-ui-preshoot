import {
  Component,
  OnInit,
  ViewChild,
  AfterViewChecked,
  AfterViewInit,
} from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { TimzoneService } from '../../shared/services/timzone.service';
import { Employee, Interview } from '../../custom-types';
import { GeneralService } from '../../shared/services/general.service';
import * as moment from 'moment';
import { EventApi } from '@fullcalendar/core';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.scss'],
})
export class EmpDashboardComponent implements OnInit {

  calendarPlugins = [
    dayGridPlugin,
    interactionPlugin,
    timeGridPlugin,
    listPlugin,
  ];
  viewType = 'dayGridMonth';
  header = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
  };
  events: any[] = [];
  selectedInterview: Interview;
  todaysInterviews: Interview[] = [];

  constructor(
    private timezoneService: TimzoneService,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    const employee = JSON.parse(
      localStorage.getItem('loggedInUser')
    ) as Employee;

    const interviewUrl = employee.links
      .filter((link) => 'Interview' === link.rel)
      .map((link) => link.href);
    if (interviewUrl.length < 0) {
      return;
    }

    this.loadInterviewsData(interviewUrl[0]);
  }

  handleEventClick(arg) {
    const event = arg.event as EventApi;
    this.selectedInterview = event.extendedProps.interview;
  }

  loadInterviewsData = (interviewUrl) => {
    this.generalService.getHateosData(interviewUrl).subscribe((response) => {
      const interviews = response.data as Interview[];
      this.prepareEventsArray(interviews);
    });
  }

  prepareEventsArray = (interviews) => {
    interviews.forEach((interview, index) => {
      moment(interview.scheduledTime);
      const dt = this.timezoneService.utcToTenant(
        moment(interview.scheduledTime)
      );

      const now = moment(new Date());
      console.log(dt.format('YYYY-MM-DD') === now.format('YYYY-MM-DD'));

      this.events = this.events.concat({
        title: `${interview.candidate.firstName} ${interview.candidate.lastName} - ${interview.interviewRounds.length + 1}`,
        start: dt.toDate(),
        allDay: false,
        backgroundColor: this.getColor(interview.status),
        borderColor: this.getColor(interview.status),
        textColor: 'black',
        interview
      });
    });
  }

  getColor = (status) => {
    switch (status) {
        case 'SELECTED' : return 'green';
        case 'REJECTED' : return 'darksalmon';
        case 'SCHEDULED' : return 'khaki';
        case 'UNDER_PROCESS' : return 'greenyellow';
        default: return 'transparent';
    }
  }
  
}
