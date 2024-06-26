import {Component, OnInit} from '@angular/core';
import {MatButton, MatFabButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {UsersDTO} from "../model/users";
import {UsersService} from "../services/users/users.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {AxiosService} from "../services/axios/axios.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    MatFabButton,
    NgForOf,
    MatButton,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel
  ],
  templateUrl: './admin-deshboard.component.html',
  styleUrl: './admin-deshboard.component.css'
})
export class AdminDeshboardComponent implements OnInit {
  users: UsersDTO[] = [];
  selectedRole = []

  constructor(private userService: UsersService, private axiosService: AxiosService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.userService.getAll().then(users => {
      this.users = users;
      // @ts-ignore
      this.selectedRole = this.users.map(user => user.role);
    }).catch(error => {
      console.error('Error while fetching products:', error);
    });
  }
  assignRole(user: UsersDTO, selectedRole: string): void {

    this.axiosService.request(
      'PUT',
      `/api/admin/changeRole/${user.username}`,
      selectedRole
  ).then(response => {
      this.snackBar.open('Role assigned successfully:', '', {
        duration: 3000
      });
      this.userService.getAll().then(users => {
        this.users = users;
      }).catch(error => {
        console.error('Error while fetching users', error);
      });
    }).catch(error => {
      this.snackBar.open('User already has this role ', '', {
        duration: 3000
      });
    });
  }
  deleteUser(user: UsersDTO): void {
    this.axiosService.request(
      'DELETE',
      `/api/admin/delete/${user.id}`,
    this.users
  ).then(response => {
      this.snackBar.open('User was deleted successfully:', '', {
        duration: 3000
      });
      this.userService.getAll().then(users => {
        this.users = users;
      }).catch(error => {
        console.error('Error while fetching users:', error);
      });
    }).catch(error => {
      this.snackBar.open('Error while deleting user', '', {
        duration: 3000
      });
    });
  }


}
