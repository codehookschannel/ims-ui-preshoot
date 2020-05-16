import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto, Employee } from '../../custom-types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  empUrl = `${environment.apiUrl}/employees`;
  constructor(
    private http: HttpClient
  ) { }

  loadAllEmployees() {
    return this.http.get<ResponseDto<Employee[]>>(this.empUrl);
  }

  saveEmployee(employee: Employee) {
    return this.http.post<ResponseDto<Employee>>(this.empUrl, employee);
  }

  loadEmployeeById(empId: string) {
    return this.http.get<ResponseDto<Employee>>(`${this.empUrl}/${empId}`);
  }
}
