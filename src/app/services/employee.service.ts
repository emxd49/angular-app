import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployees } from '../data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseURL = 'http://localhost:5000/api/employee';
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
  updateEmployee(id: string, employee: IEmployees) {
    return this.http.put(`${this.baseURL}/${id}`, employee);
  }
  addEmployee(employee: IEmployees) {
    return this.http.post(this.baseURL, employee);
  }
}
