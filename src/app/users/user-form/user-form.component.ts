import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUsers } from '../../data.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  editID: string | null = null;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.activeRoute.paramMap.subscribe((paramMap) => {
      this.editID = paramMap.get('id');
    });
  }

  userForm = new FormGroup({
    name: new FormControl(''),
    age: new FormControl<number | null>(null),
  });

  ngOnInit() {
    if (this.editID) {
      this.userService
        .getUser(this.editID)
        .subscribe((data) =>
          this.userForm.setValue({ name: data.name, age: data.age })
        );
    }
  }

  handleSubmit() {
    if (!(this.userForm.value.name && this.userForm.value.age)) {
      alert('Cannot be empty!');
      return;
    }
    if (this.editID) {
      const user: IUsers = {
        id: this.editID,
        name: this.userForm.value.name,
        age: this.userForm.value.age,
      };
      this.userService
        .editUser(user)
        .subscribe((data) => console.log('Updated: ', data));
    } else {
      const user: IUsers = {
        id: crypto.randomUUID(),
        name: this.userForm.value.name,
        age: this.userForm.value.age,
      };
      this.userService
        .addUser(user)
        .subscribe((data) => console.log('Updated: ', data));
    }
    this.router.navigate(['users/user-list']);
  }
}
