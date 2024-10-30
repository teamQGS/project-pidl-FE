import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../services/cart/cart.service';
import { ProductsDTO } from '../model/products';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFabButton } from "@angular/material/button";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, NgIf, MatFabButton],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  @Input() product: ProductsDTO | null = null;

  constructor(private cartService: CartService, private snackBar: MatSnackBar) {}

  close() {
    this.product = null;
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId);
    this.snackBar.open("Product was added to cart", '', {
      duration: 3000
    });
    this.close();
  }
}
