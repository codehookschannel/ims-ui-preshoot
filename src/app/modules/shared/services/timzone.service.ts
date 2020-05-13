import { Injectable } from '@angular/core';

import { Moment } from 'moment';
import moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class TimzoneService {

  public tenantTimeZone;

  constructor() {
    this.tenantTimeZone = 'GMT';
  }

  public setTenantTimeZone(tenantTz: string) {
    this.tenantTimeZone = tenantTz;
  }

  public utcToTenant(utcDateTime: Moment): Moment {
    return moment.tz(utcDateTime, this.tenantTimeZone);
  }

  public tenantToUtc(tenantDateTime: Moment): Moment {
    return moment(tenantDateTime).utc();
  }
}
