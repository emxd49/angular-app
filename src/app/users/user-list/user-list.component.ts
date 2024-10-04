import { Component } from '@angular/core';
import { IUsers } from '../../data.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  users: IUsers[] = [];
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
  deleteUser(id: string) {
    this.userService
      .deleteUsers(id)
      .subscribe(() => console.log('Deleted Users'));
    this.loadUsers();
  }
  editUser(id: any) {
    this.router.navigate(['users/user-form', id]);
  }
}
