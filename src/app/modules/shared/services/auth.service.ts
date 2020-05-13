import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseDto, UserProfile } from '../../custom-types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient
  ) { }

  login(loginObj) {
    return this.http.post<ResponseDto<UserProfile>>(`${this.authUrl}/login`, loginObj);
  }
}
