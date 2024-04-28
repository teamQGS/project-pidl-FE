import {Component, OnInit} from '@angular/core';
import {CartService} from "../services/cart/cart.service";
import {ProductsDTO} from "../model/products";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgForOf,
    MatFabButton,
    NgIf,
    MatButton
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: ProductsDTO[] = [];

  constructor(private cartService: CartService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(product: ProductsDTO) {
    this.cartService.removeFromCart(product);
    this.cartItems = this.cartService.getCartItems();
    this.snackBar.open("Product was deleted from cart", '', {
      duration: 3000
    })
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.snackBar.open("Cart was cleaned", '', {
      duration: 3000
    })
  }

  createOrder(cartItems: ProductsDTO[]) {
    //TODO create order
  }
}
