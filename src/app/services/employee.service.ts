import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployees } from '../data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseURL = 'http://localhost:5000/api/employee';
  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('accessToken');
    return new HttpHeaders({ Authorization: `Bearer ${authToken}` });
  }
  getEmployee(id: string): Observable<IEmployees> {
    const headers = this.getHeaders();
    return this.http.get<IEmployees>(`${this.baseURL}/${id}`, { headers });
  }
  getEmployees(): Observable<IEmployees[]> {
    const headers = this.getHeaders();
    return this.http.get<IEmployees[]>(this.baseURL, { headers });
  }
  deleteEmployee(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseURL}/${id}`, { headers });
  }
  updateEmployee(id: string, employee: IEmployees) {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseURL}/${id}`, employee, { headers });
  }
  addEmployee(employee: IEmployees) {
    const headers = this.getHeaders();
    return this.http.post(this.baseURL, employee, { headers });
  }
}
