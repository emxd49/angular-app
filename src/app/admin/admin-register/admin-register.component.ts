import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.scss',
})
export class AdminRegisterComponent {
  snackBar = inject(MatSnackBar);
  constructor(private authService: AuthService, private router: Router) {}
  adminForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  handleSubmit() {
    const admin: any = {
      username: this.adminForm.value.username,
      password: this.adminForm.value.password,
    };
    this.authService.registerAdmin(admin).subscribe(() => {
      this.router.navigate(['admin/login']);
      this.snackBar.open('Successfully logged in!', 'Ok', {
        duration: 3000,
      });
    });
  }
}
