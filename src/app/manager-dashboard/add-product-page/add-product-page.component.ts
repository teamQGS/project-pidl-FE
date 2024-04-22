import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AxiosService} from "../../services/axios/axios.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-product-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatProgressSpinner
  ],
  templateUrl: './add-product-page.component.html',
  styleUrl: './add-product-page.component.css'
})
export class AddProductPageComponent {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private axiosService: AxiosService,
    private snackBar: MatSnackBar
  ) {}

  addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required]
  });

  onSubmit(){
    if (this.addProductForm.valid) {
      const formData = this.addProductForm.value;
      this.axiosService.request(
        "POST",
        "/api/products/add",
        formData,
      ).then(response => {
        this.snackBar.open("Product was added successfully", '', {
          duration: 3000
        });
        this.router.navigateByUrl('/manager-dashboard');
      }).catch(error => {
        console.log('error', error);
        this.snackBar.open("Error occurred while adding product", '', {
          duration: 3000
        });
      });
    }
  }
}
