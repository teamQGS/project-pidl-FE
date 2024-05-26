import { Component, EventEmitter, Output } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatTooltip } from "@angular/material/tooltip";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
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
  passwordRequirements = {
    minLength: false,
    uppercase: false,
    specialChar: false,
    number: false,
    matching: false
  };

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.registerFormular = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });

    this.registerFormular.get('password')?.valueChanges.subscribe(value => {
      this.updatePasswordRequirements(value);
    });

  this.registerFormular.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.checkPasswordsMatch();
  });



  }

  allRequirementsMet(): boolean {
    return this.passwordRequirements.minLength &&
           this.passwordRequirements.uppercase &&
           this.passwordRequirements.specialChar &&
           this.passwordRequirements.number &&
           this.passwordRequirements.matching;
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
    const password = this.registerFormular.get('password')?.value;
    const confirmPassword = this.registerFormular.get('confirmPassword')?.value;
    this.passwordRequirements.matching = password === confirmPassword;
  }

  onSubmitRegister() {
    if (this.registerFormular.valid && this.allRequirementsMet()) {
      this.newUserEvent.emit({
        'email': this.registerFormular.value.email,
        'username': this.registerFormular.value.username,
        'password': this.registerFormular.value.password
      });
      this.router.navigate(['/success']);
    }
  }
}
