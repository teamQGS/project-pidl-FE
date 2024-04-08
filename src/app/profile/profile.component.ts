import {Component, EventEmitter, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import { MatIconModule } from '@angular/material/icon';
import {FormBuilder} from "@angular/forms";
import {UserService} from "../services/user/user.service";
import {Router, RouterLink} from "@angular/router";
import {ToastService} from "angular-toastify";
import {AxiosService} from "../services/axios/axios.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatButton,
    MatTooltip,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private formBuilder: FormBuilder, private demoService: UserService, private router:Router,
              private toastService: ToastService, private axiosService: AxiosService) {}

  @Output() logoutEvent = new EventEmitter;

  username: string = "user"

  onLogout() {
    this.axiosService.request(
      'POST',
      '/api/users/logout', // Это эндпоинт для выхода из системы
      {}
    ).then(response => {
      // Удалить токен из localStorage или другого места, где он хранится
      window.localStorage.removeItem("auth_token"); // Пример удаления токена из localStorage
      // Перенаправить пользователя на страницу входа или на другую страницу, если необходимо
      this.router.navigateByUrl('/login');
    }).catch(error => {
      console.log('Error during logout:', error);
    });
  }
}
