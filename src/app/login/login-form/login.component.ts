import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatInput} from "@angular/material/input";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatButton,
    MatTooltip,
    MatInput,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() onSubmitLoginEvent = new EventEmitter;

  constructor(private formBuilder: FormBuilder){
  }


  loginFormular = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmitLogin() {
    this.onSubmitLoginEvent.emit({
      'username': this.loginFormular.value.username,
      'password': this.loginFormular.value.password
    });
  }
}
