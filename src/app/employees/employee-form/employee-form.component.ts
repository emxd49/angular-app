import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IEmployees } from '../../data.model';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent {
  editID: string | null = null;
  educationOptions: string[] = ['UG', 'PG', 'MBA'];

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.activeRoute.paramMap.subscribe((paramMap) => {
      this.editID = paramMap.get('id');
    });
  }

  employeeForm = new FormGroup({
    fName: new FormControl('', [Validators.required]),
    lName: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    education: new FormControl('', [Validators.required]),
    dob: new FormControl(new Date(), [Validators.required]),
    experience: new FormControl<number | null>(null, [Validators.required]),
  });

  ngOnInit() {
    if (this.editID) {
      this.employeeService.getEmployee(this.editID).subscribe((data) => {
        this.employeeForm.setValue({
          fName: data.firstName,
          lName: data.lastName,
          gender: data.gender,
          email: data.email,
          education: data.education,
          dob: data.dob,
          experience: data.experience,
        });
      });
    }
  }

  handleSubmit() {
    if (this.editID) {
      const existingEmployee: any = {
        id: this.editID,
        firstName: this.employeeForm.value.fName,
        lastName: this.employeeForm.value.lName,
        gender: this.employeeForm.value.gender,
        email: this.employeeForm.value.email,
        education: this.employeeForm.value.education,
        dob: this.employeeForm.value.dob,
        experience: this.employeeForm.value.experience,
      };
      this.employeeService
        .updateEmployee(existingEmployee)
        .subscribe((data) => console.log('Updated: ', data));
    } else {
      const newEmployee: any = {
        id: crypto.randomUUID(),
        firstName: this.employeeForm.value.fName,
        lastName: this.employeeForm.value.lName,
        gender: this.employeeForm.value.gender,
        email: this.employeeForm.value.email,
        education: this.employeeForm.value.education,
        dob: this.employeeForm.value.dob,
        experience: this.employeeForm.value.experience,
      };
      this.employeeService
        .addEmployee(newEmployee)
        .subscribe((data) => console.log('Updated: ', data));
    }
    this.router.navigate(['employees/employee-list']);
  }
}
