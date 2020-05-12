import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseDto, Candidate } from '../../custom-types';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  candidateUrl = `${environment.apiUrl}/candidates`;

  constructor(
    private http: HttpClient
  ) { }

  loadAllCandidates() {
    return this.http.get<ResponseDto<Candidate[]>>(this.candidateUrl);
  }

  saveCandidate(candidate: Candidate) {
    return this.http.post<ResponseDto<Candidate>>(this.candidateUrl, candidate);
  }
}
