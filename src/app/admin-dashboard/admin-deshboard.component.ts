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
  selectedRole: String | undefined;

  constructor(private userService: UsersService, private axiosService: AxiosService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.userService.getAll().then(users => {
      this.users = users;
    }).catch(error => {
      console.error('Error while fetching products:', error);
    });
  }
  assignRole(user: UsersDTO): void {
    this.axiosService.request(
      'PUT',
      `/api/admin/changeRole/${user.username}`,
      this.selectedRole
    ).then(response => {
      this.snackBar.open('Role assigned successfully:', '', {
        duration: 3000
      });
      // Получить обновленный список пользователей
      this.userService.getAll().then(users => {
        this.users = users;
      }).catch(error => {
        console.error('Error while fetching products:', error);
      });
    }).catch(error => {
      this.snackBar.open('Error while assigning role', '', {
        duration: 3000
      });
    });
  }


}
