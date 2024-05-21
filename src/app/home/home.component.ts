import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
import { NgForOf, NgOptimizedImage } from '@angular/common';
import { ProductsDTO } from '../model/products';
import { CartService } from '../services/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { SearchComponent } from '../search/search.component';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    SearchComponent,
    MatIcon,
    MatFabButton,
    MatMiniFabButton,
    ProductDetailsComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedProduct: ProductsDTO | null = null; // По умолчанию ничего не выбрано
  products: ProductsDTO[] = [];

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getAll().then(products => {
      this.products = products;
    }).catch(error => {
      console.error('Error while fetching products:', error);
    });
  }

  onSearchResults(products: ProductsDTO[]): void {
    this.products = products;
  }

  selectProduct(product: ProductsDTO): void {
    this.selectedProduct = product;
  }

  addToCart(productId: string): void {
    this.cartService.addToCart(productId);
    this.snackBar.open('Product was added to cart', '', {
      duration: 3000
    });
  }
}
