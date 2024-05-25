import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AxiosService} from "../../services/axios/axios.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-update-product-page',
  standalone: true,
    imports: [
        MatButton,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './update-product-page.component.html',
  styleUrl: './update-product-page.component.css'
})
export class UpdateProductPageComponent {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private axiosService: AxiosService,
    private snackBar: MatSnackBar
  ) {}
  selectedCategory: String | undefined;
  file: File | null = null; // Variable to store file

  updateProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [ '', Validators.required],
    count: [ '', Validators.required],
  });

  onChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
    }
  }

  // onSubmit(){
  //   if (this.updateProductForm.valid) {
  //     this.axiosService.request(
  //       "PUT",
  //       `/api/products/update/${}`,
  //       {
  //
  //       }
  //     ).then(response => {
  //       this.snackBar.open("Product was updated successfully", '', {
  //         duration: 3000
  //       });
  //       this.router.navigateByUrl('/manager-dashboard');
  //     }).catch(error => {
  //       console.log('error', error);
  //       this.snackBar.open("Error occurred while updating product", '', {
  //         duration: 3000
  //       });
  //     });
  //   }
  // }
}
