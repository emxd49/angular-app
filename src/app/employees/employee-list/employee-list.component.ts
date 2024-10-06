import { Component } from '@angular/core';
import { IEmployees } from '../../data.model';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'gender',
    'email',
    'education',
    'dob',
    'experience',
    'edit',
    'delete'
  ];
  employees: IEmployees[] = [];
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}
  ngOnInit() {
    this.loadEmployees();
  }
  loadEmployees() {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }
  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      console.log('Deleted Employee');
      this.loadEmployees();
    });
  }
  editEmployee(id: any) {
    this.router.navigate(['employees/employee-form', id]);
  }
  addEmployee() {
    this.router.navigate(['employees/employee-form']);
  }
}
