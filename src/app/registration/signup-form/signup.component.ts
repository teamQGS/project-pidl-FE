import { Component, EventEmitter, Output } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatTooltip } from "@angular/material/tooltip";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { ToastService } from "angular-toastify";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatTooltip,
    ReactiveFormsModule,
    RouterLink,
    MatError,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  @Output() newUserEvent = new EventEmitter();

  registerFormular: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.registerFormular = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('(?=.*[A-Z]).*')
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmitRegister() {
    if (this.registerFormular.valid) {
      this.newUserEvent.emit({
        'email': this.registerFormular.value.email,
        'username': this.registerFormular.value.username,
        'password': this.registerFormular.value.password
      });
      this.router.navigate(['/success']); // Example redirect, adapt as needed
    } else {
      // Handle form errors
      // Optionally use angular-toastify to show errors or other info
    }
  }
}
