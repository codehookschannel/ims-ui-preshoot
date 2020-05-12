import { Injectable } from '@angular/core';
import { Interview, ResponseDto } from '../../custom-types';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  $scheduledInterviews: Subject<{date: any, value: number}[]> = new Subject<{date: any, value: number}[]>();

  interviewUrl = `${environment.apiUrl}/interviews`;
  constructor(
    private http: HttpClient
  ) { }

  loadAllInterviews() {
    return this.http.get<ResponseDto<Interview[]>>(this.interviewUrl);
  }

  saveInterview(interview: Interview) {
    return this.http.post<ResponseDto<Interview>>(this.interviewUrl, interview);
  }
}
