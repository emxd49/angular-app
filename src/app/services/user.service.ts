import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsers } from '../data.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL = 'http://localhost:5001/api/users';
  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<IUsers> {
    return this.http.get<IUsers>(`${this.baseURL}/${id}`);
  }
  getUsers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.baseURL);
  }
  deleteUsers(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  } 
  editUser(id:any, user: IUsers) {
    return this.http.put(`${this.baseURL}/${id}`, user);
  }
  addUser(user: IUsers) {
    return this.http.post(this.baseURL, user);
  }
}
