import { Component, inject, ViewChild } from '@angular/core';
import { IEmployees } from '../../data.model';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  snackBar = inject(MatSnackBar);
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  employeesData: MatTableDataSource<IEmployees> = new MatTableDataSource();
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'gender',
    'email',
    'education',
    'dob',
    'experience',
    'edit',
    'delete',
  ];
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employeesData = new MatTableDataSource(employees);
      this.employeesData.paginator = this.paginator;
      this.employeesData.sort = this.sort;
    });
  }
  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
      this.snackBar.open('Employee successfully deleted!', 'Ok', {
        duration: 3000,
      });
    });
  }
  editEmployee(id: any) {
    this.router.navigate(['employees/employee-form', id]);
  }
  addEmployee() {
    this.router.navigate(['employees/employee-form']);
  }
  applyFilter(filter: any) {
    filter = filter.value.trim().toLowerCase();
    this.employeesData.filter = filter;
  }
  logoutAdmin() {
    this.authService.logOutAdmin();
  }
}
