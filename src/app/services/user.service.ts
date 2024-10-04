import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsers } from '../data.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL = 'http://localhost:5000/users';
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
  editUser(user: IUsers) {
    return this.http.patch(`${this.baseURL}/${user.id}`, user);
  }
  addUser(user: IUsers) {
    return this.http.post(this.baseURL, user);
  }
}
