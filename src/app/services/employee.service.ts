import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployees } from '../data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseURL = 'http://localhost:5000/employees';
  constructor(private http: HttpClient) {}

  getEmployee(id: string): Observable<IEmployees> {
    return this.http.get<IEmployees>(`${this.baseURL}/${id}`);
  }
  getEmployees(): Observable<IEmployees[]> {
    return this.http.get<IEmployees[]>(this.baseURL);
  }
  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
  updateEmployee(employee: IEmployees) {
    return this.http.patch(`${this.baseURL}/${employee.id}`, employee);
  }
  addEmployee(employee: IEmployees) {
    return this.http.post(this.baseURL, employee);
  }
}
