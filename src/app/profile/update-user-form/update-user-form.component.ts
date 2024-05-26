import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SettingsComponent } from "../settings/settings.component";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AxiosService } from "../../services/axios/axios.service";
import { Router } from "@angular/router";
import { RouterLink } from '@angular/router';
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { MatTooltip } from "@angular/material/tooltip";
import { MatIcon } from "@angular/material/icon";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-update-user-form',
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
  templateUrl: './update-user-form.component.html',
  styleUrl: './update-user-form.component.css'
})
export class UpdateUserFormComponent implements OnInit {
  isEditEnabled: boolean = false;

  constructor(private fb: FormBuilder, private axiosService: AxiosService,
              private router: Router) { }

  username = window.localStorage.getItem("username");

  ngOnInit(): void {
    this.axiosService.request(
      "GET",
      `/api/users/find/${this.username}`,
      {}
    ).then(response => {
      const userData = response.data;
      this.updateForm.patchValue({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        address: userData.address,
        phoneNumber: userData.phoneNumber
      });
    }).catch(error => {
      console.log('Error fetching user data:', error);
    });
  }

  updateForm = this.fb.group({
    firstName: [{ value: '', disabled: true }],
    lastName: [{ value: '', disabled: true }],
    email: [{ value: '', disabled: true }],
    address: [{ value: '', disabled: true }],
    phoneNumber: [{ value: '', disabled: true }]
  });

  enableEdit(): void {
    this.isEditEnabled = true;
    this.updateForm.enable();
  }

  updateUser(): void {
    this.axiosService.request(
      'PUT',
      `/api/users/update/${this.username}`,
      {
        firstName: this.updateForm.value.firstName,
        lastName: this.updateForm.value.lastName,
        email: this.updateForm.value.email,
        address: this.updateForm.value.address,
        phoneNumber: this.updateForm.value.phoneNumber
      }
    ).then(response => {
      this.router.navigate(['/profile']);
    }).catch(error => {
      console.log('Error during update:', error);
    });
  }
}
