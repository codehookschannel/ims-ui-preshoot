import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseDto, InterviewStatDto } from '../../custom-types';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
ß
  dashboardUrl = `${environment.apiUrl}/dashboard`;

  constructor(
    private http: HttpClient
  ) { }

  loadByStatus() {
    return this.http.get<ResponseDto<InterviewStatDto[]>>(`${this.dashboardUrl}/status`);
  }

  loadByDate() {
    return this.http.get<ResponseDto<InterviewStatDto[]>>(`${this.dashboardUrl}/date`);
  }
}
