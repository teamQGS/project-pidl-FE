import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AxiosService} from "../../services/axios/axios.service";

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent {
  constructor(private snackBar: MatSnackBar, private axiosService: AxiosService ){
  }

    onSubmit(): void {
      this.snackBar.open( 'Order was successfully created', '', {
        duration: 3000
      })
    }
}
