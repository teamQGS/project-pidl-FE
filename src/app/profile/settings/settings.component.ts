import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AxiosService} from "../../services/axios/axios.service";
import {Router, RouterLink} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    MatTooltip,
    ReactiveFormsModule,
    NgIf,
    MatFormField,
    MatInput,
    MatLabel,
    RouterLink
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent{
  constructor(private router:Router,
              private axiosService: AxiosService, private snackBar: MatSnackBar, private authService: AuthService) {}
  username = window.localStorage.getItem("username");
  onDelete() {
    this.axiosService.request(
      'DELETE',
      `/api/users/delete/${(this.username)}`,
      {}
    ).then(response => {
      this.authService.logoutUser();
      window.localStorage.removeItem("auth_token");
      window.localStorage.removeItem("auth_token_expiration");
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("role");
      this.router.navigateByUrl('/')
      this.snackBar.open("Account was deleted successfully", '', {
        duration: 3000
      })
    }).catch(error => {
      console.log('Error with deleting:', error);
    });
  }
}
