import {Component, Input, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
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
export class UpdateProductPageComponent implements OnInit{
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private axiosService: AxiosService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {}
  selectedCategory: String | undefined;
  file: File | null = null; // Variable to store file
  @Input() productId: string | undefined;

  updateProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [ '', Validators.required],
    count: [ '', Validators.required],
    productCategory: [ '', Validators.required],
    illustration: [ '', Validators.required]
  });

  onChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
    }
  }

  onSubmit(){
    if (this.updateProductForm.valid) {
      this.axiosService.request(
        "PUT",
        `/api/products/update/${this.productId}`,
        {
          name: this.updateProductForm.value.name,
          description: this.updateProductForm.value.description,
          price: this.updateProductForm.value.price,
          count: this.updateProductForm.value.count,
          illustration: this.updateProductForm.value.illustration
        }
      ).then(response => {
        this.snackBar.open("Product was updated successfully", '', {
          duration: 3000
        });
        this.router.navigateByUrl('/manager-dashboard');
      }).catch(error => {
        console.log('error', error);
        this.snackBar.open("Error occurred while updating product", '', {
          duration: 3000
        });
      });
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.productId = params['productId']
      console.log(this.productId);
    });
    this.axiosService.request(
      "GET",
      `/api/products/${(this.productId)}`,
      {}
    ).then(response => {
      const productData = response.data;
      this.updateProductForm.patchValue({
        productCategory: productData.productCategory,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        count: productData.count,
        illustration: productData.illustration
      })
      this.selectedCategory = productData.productCategory;
    }).catch(error => {
      console.log('Error fetching user data:', error);
    });
  }
}
