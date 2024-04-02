import {Component, EventEmitter, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {FormBuilder} from "@angular/forms";
import {UserService} from "../services/user/user.service";
import {Router} from "@angular/router";
import {ToastService} from "angular-toastify";
import {AxiosService} from "../services/axios/axios.service";

@Component({
  selector: 'app-profile',
  standalone: true,
    imports: [
        MatButton,
        MatTooltip
    ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private formBuilder: FormBuilder, private demoService: UserService, private router:Router,
              private toastService: ToastService, private axiosService: AxiosService) {}

  @Output() logoutEvent = new EventEmitter;


  // deleteUser(): void {
  //
  //   // @ts-ignore
  //   this.demoService.deleteUser(user, userId).subscribe(
  //     () => {
  //       console.log('Book was successfully deleted (on BE)');
  //       this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
  //         this.router.navigate(['/home']);
  //       });
  //     },
  //     error => {
  //       console.error('Error (on BE)');
  //     }
  //   );
  // }
}
