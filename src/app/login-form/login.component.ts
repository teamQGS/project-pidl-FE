import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatInput} from "@angular/material/input";
import {Router, RouterLink} from "@angular/router";
import {ToastService} from "angular-toastify";

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

  constructor(private formBuilder: FormBuilder, private router: Router,
              private toastService: ToastService) {
  }


  loginFormular = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmitLogin() {
    this.onSubmitLoginEvent.emit({
      'email': this.loginFormular.value.email,
      'password': this.loginFormular.value.password
    });
    this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/profile']);
    });
  }
}
