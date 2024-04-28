import { Component } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {AxiosService} from "../../services/axios/axios.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-change-password-form',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatTooltip,
    MatError,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.css'
})
export class ChangePasswordFormComponent {
  constructor(private fb: FormBuilder, private axiosService: AxiosService,
              private router: Router) {
  }

  username = window.localStorage.getItem("username");

  passwordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    password: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('(?=.*[A-Z]).*')
    ]],
    confirmPassword: ['', Validators.required]
  });

  changePassword() {
    if (this.passwordForm.value.password != this.passwordForm.value.confirmPassword) {
      console.log("Passwords don't match");
    } else {
      this.axiosService.request(
        'PUT',
        `/api/users/changePassword/${(this.username)}`,
        {
          currentPassword: this.passwordForm.value.currentPassword,
          newPassword: this.passwordForm.value.password,
          username: this.username
        }
      ).then(response => {
        this.router.navigate(['/profile']);
      }).catch(error => {
        console.log('Error during change:', error);
      })
    }
  }
}
