import { Component } from '@angular/core';
import {ProductsService} from "../services/products/products.service";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {ProductsDTO} from "../model/products";
import {ActivatedRoute} from "@angular/router";
import {SearchComponent} from "../search/search.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    SearchComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  products: ProductsDTO[] = [];
  constructor(private productsService: ProductsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.productsService.getAll().then(products => {
      this.products = products;
    }).catch(error => {
      console.error('Error while fetching products:', error);
    });
  }

}
