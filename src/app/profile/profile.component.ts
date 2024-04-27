import {Component, EventEmitter, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import { MatIconModule } from '@angular/material/icon';
import {FormBuilder} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {ToastService} from "angular-toastify";
import {AxiosService} from "../services/axios/axios.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatButton,
    MatTooltip,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private formBuilder: FormBuilder, private router:Router,
              private toastService: ToastService, private axiosService: AxiosService, private snackBar: MatSnackBar) {}

  @Output() logoutEvent = new EventEmitter;

  username = window.localStorage.getItem("username");

  onLogout() {
    this.axiosService.request(
      'POST',
      '/api/users/logout',
      {}
    ).then(response => {
      window.localStorage.clear();
      this.router.navigateByUrl('/');
      this.snackBar.open("Logged out successfully", '', {
        duration: 3000
      })
    }).catch(error => {
      console.log('Error during logout:', error);
    });
  }

}
