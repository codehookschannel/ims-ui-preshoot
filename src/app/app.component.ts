import { Component, OnInit } from '@angular/core';
import { TimzoneService } from './modules/shared/services/timzone.service';
import moment from 'moment-timezone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'interview-management-system-ui';

  constructor(
    private timezoneService: TimzoneService
  ) {}

  ngOnInit() {
    const tz = moment.tz.guess();
    console.log(tz);
    this.timezoneService.setTenantTimeZone(tz);
  }
}
