import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AxiosService} from "../../services/axios/axios.service";
import {Router} from "@angular/router";

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
    MatLabel
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent{
  showUpdateForm: boolean = false;

  @Output() updateUserEvent = new EventEmitter();

  constructor(private fb: FormBuilder, private axiosService: AxiosService,
              private router: Router) { }

  updateForm = this.fb.group({
    username: ['', Validators.required],
    firstName: [''],
    lastName: [''],
    email: [''],
    address: [''],
    phoneNumber: ['']
  });

  updateUser(): void {
    this.axiosService.request(
      'PUT', `/api/users/update/{this.username}`,
      {
        username: this.updateForm.value.username,
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
    })
  }

  onSubmitUpdate(){
    this.updateUserEvent.emit({
      'username': this.updateForm.value.username,
      'firstName': this.updateForm.value.firstName,
      'lastName': this.updateForm.value.lastName,
      'email': this.updateForm.value.email,
      'address': this.updateForm.value.address,
      'phoneNumber': this.updateForm.value.phoneNumber
    });
  }
}
