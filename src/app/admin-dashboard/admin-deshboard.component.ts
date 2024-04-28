import { Component } from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {UsersDTO} from "../model/users";
import {UsersService} from "../services/users/users.service";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
    imports: [
        MatFabButton,
        NgForOf
    ],
  templateUrl: './admin-deshboard.component.html',
  styleUrl: './admin-deshboard.component.css'
})
export class AdminDeshboardComponent {
  users: UsersDTO[] = [];
  constructor(private userService: UsersService) {}
  ngOnInit(): void {
    this.userService.getAll().then(users => {
      this.users = users;
    }).catch(error => {
      console.error('Error while fetching products:', error);
    });
  }
}
