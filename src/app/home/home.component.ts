import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../services/products/products.service";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {ProductsDTO} from "../model/products";
import {ActivatedRoute} from "@angular/router";
import {SearchComponent} from "../search/search.component";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {CartService} from "../services/cart/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    SearchComponent,
    MatIcon,
    MatFabButton,
    MatMiniFabButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  products: ProductsDTO[] = [];
  constructor(private productsService: ProductsService, private route: ActivatedRoute,
              private cartService: CartService, private snackBar: MatSnackBar ) {
  }

  ngOnInit(): void {
    this.productsService.getAll().then(products => {
      this.products = products;
    }).catch(error => {
      console.error('Error while fetching products:', error);
    });
  }

  addToCart(product: ProductsDTO) {
    this.cartService.addToCart(product);
    this.snackBar.open("Product was added to cart", '', {
      duration: 3000
    })
  }
}
