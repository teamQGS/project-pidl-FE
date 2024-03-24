import {Component, EventEmitter, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {ToastService} from "angular-toastify";
import {UserDTO} from "../model/model";
import {UserService} from "../services/user.service";

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
        RouterLink
    ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  @Output() newUserEvent = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private router:Router,
              private toastService: ToastService, private userService: UserService) {}

  registerFormular = this.formBuilder.group({
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmitRegister(){
    this.newUserEvent.emit({'email': this.registerFormular.value.email,
      'username': this.registerFormular.value.username, 'password': this.registerFormular.value.password});
    this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/profile']);
    });
  }


  // signup() {
  //   console.warn(this.registerFormular.value);
  //   if(this.registerFormular.value.username != null
  //     && this.registerFormular.value.email != null
  //     && this.registerFormular.value.password != null){
  //     let user: UserDTO = new UserDTO(null, this.registerFormular.value.username,
  //       this.registerFormular.value.email,this.registerFormular.value.password);
  //     this.userService.createUser(user).subscribe(id => {
  //       console.log("User was created on Backend");
  //       user.id = id;
  //       this.newUserEvent.emit(user);
  //       this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
  //         this.router.navigate(['/profile']);
  //       });
  //     }, error => {
  //       this.toastService.error("Error with creating user on Backend");
  //     })
  //   }
  // }

}
