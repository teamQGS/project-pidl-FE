import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ProductsDTO} from "../model/products";
import {NgForOf, NgIf} from "@angular/common";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductsService } from '../services/products/products.service';
import { error } from '@angular/compiler-cli/src/transformers/util';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchControl: FormControl = new FormControl();
  products: ProductsDTO[] = [];

  constructor(private productService: ProductsService, private route: ActivatedRoute, private router: Router) {
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => this.search(value));
  }

  search(searchTerm: string): void {
    if (searchTerm) {
      this.productService.searchProducts(searchTerm).then(products => {
        this.products = products;
      }).catch(error => {
        console.error('Error while searching products:', error);
        this.products = [];
      });
    } else {
      this.products = [];
    }
  }
}