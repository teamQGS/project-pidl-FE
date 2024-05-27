import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatTooltip } from "@angular/material/tooltip";
import { AxiosService } from "../../services/axios/axios.service";
import { Router } from "@angular/router";
import { NgIf } from "@angular/common";
import { RouterLink } from '@angular/router';
import { FormGroup } from '@angular/forms';

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
    NgIf,
    RouterLink
  ],
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent {
  constructor(private fb: FormBuilder, private axiosService: AxiosService, private router: Router) { }

  username = window.localStorage.getItem("username");

  passwordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    password: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('(?=.*[A-Z]).*')
    ]],
    confirmPassword: ['', Validators.required]
  }, { validator: this.checkPasswords });

  passwordRequirements = {
    minLength: false,
    uppercase: false,
    specialChar: false,
    number: false,
    matching: false
  };

  ngOnInit(): void {
    // Watch for changes on the password fields
    this.passwordForm.get('password')?.valueChanges.subscribe(value => {
      this.updatePasswordRequirements(value);
    });

    this.passwordForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.checkPasswordsMatch();
    });
  }

  updatePasswordRequirements(value: string) {
    this.passwordRequirements.minLength = value.length >= 5;
    this.passwordRequirements.uppercase = /[A-Z]/.test(value);
    this.passwordRequirements.number = /\d/.test(value);
    this.passwordRequirements.specialChar = /[!@#$%^&*_-]/.test(value);
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  checkPasswordsMatch() {
    const password = this.passwordForm.get('password')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;
    this.passwordRequirements.matching = password === confirmPassword;
  }

  allRequirementsMet(): boolean {
    return this.passwordRequirements.minLength &&
      this.passwordRequirements.uppercase &&
      this.passwordRequirements.specialChar &&
      this.passwordRequirements.number &&
      this.passwordRequirements.matching;
  }

  changePassword() {
    if (this.passwordForm.valid && this.allRequirementsMet()) {
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
      });
    }
  }
}
