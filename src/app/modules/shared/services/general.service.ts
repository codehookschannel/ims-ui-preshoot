import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../../custom-types';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private http: HttpClient
  ) { }

  getHateosData(url: string) {
    return this.http.get<ResponseDto<any>>(url);
  }
}
