import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-add-product-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-product-page.component.html',
  styleUrl: './add-product-page.component.css'
})
export class AddProductPageComponent {

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required]
  });

}
