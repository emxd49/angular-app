import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
