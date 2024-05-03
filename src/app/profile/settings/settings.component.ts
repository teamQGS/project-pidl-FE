import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AxiosService} from "../../services/axios/axios.service";
import {Router, RouterLink} from "@angular/router";
import {ToastService} from "angular-toastify";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  constructor(private formBuilder: FormBuilder, private router:Router,
              private toastService: ToastService, private axiosService: AxiosService, private snackBar: MatSnackBar) {}
  username = window.localStorage.getItem("username");
  onDelete() {
    this.axiosService.request(
      'DELETE',
      `/api/users/delete/${(this.username)}`,
      {}
    ).then(response => {
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
