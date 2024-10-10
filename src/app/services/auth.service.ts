import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAdmin } from '../data.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  snackBar = inject(MatSnackBar);
  baseURL = 'http://localhost:5000/api/admin';
  private isAuthenticated;
  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated = false;
  }
  registerAdmin(admin: IAdmin): Observable<IAdmin> {
    return this.http.post<any>(`${this.baseURL}/register`, admin);
  }
  loginAdmin(admin: IAdmin): void {
    this.http.post<any>(`${this.baseURL}/login`, admin).subscribe((token) => {
      localStorage.setItem('accessToken', token.accessToken);
      this.isAuthenticated = true;
      this.router.navigate(['employees']);
      this.snackBar.open('Successfully logged in!', 'Ok', {
        duration: 3000,
      });
    });
  }
  logOutAdmin() {
    //should inform server
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
    this.router.navigate(['admin/login']);
    this.snackBar.open('Successfully logged out!', 'Ok', {
      duration: 3000,
    });
  }
  public isAuthenticatedAdmin(): boolean {
    // return localStorage.getItem("accessToken") ? true : false
    return this.isAuthenticated;
  }
}
