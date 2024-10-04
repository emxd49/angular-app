import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';

const routes: Routes = [
  {
    path: 'books',
    loadChildren: () =>
      import('./books/books.module').then((m) => m.BooksModule),
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('./employees/employees.module').then((e) => e.EmployeesModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((u) => u.UsersModule),
  },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  // {
  //   path: 'users',
  //   component: UserListComponent,
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'form',
  //   component: UserFormComponent,
  // },
  // {
  //   path: 'form/:id',
  //   component: UserFormComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
