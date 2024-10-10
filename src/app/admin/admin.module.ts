import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AdminLoginComponent, AdminRegisterComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatError,
    MatInputModule,
    MatButtonModule,
  ],
})
export class AdminModule {}
