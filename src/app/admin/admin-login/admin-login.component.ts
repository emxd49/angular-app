import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  constructor(private authService: AuthService, private router: Router) {
  }
  adminForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  handleSubmit() {
    const admin: any = {
      username: this.adminForm.value.username,
      password: this.adminForm.value.password,
    };
    this.authService.loginAdmin(admin);
  }
}
