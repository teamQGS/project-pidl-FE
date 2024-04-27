import {Component, OnInit} from '@angular/core';
import {CartService} from "../services/cart/cart.service";
import {ProductsDTO} from "../model/products";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton, MatFabButton} from "@angular/material/button";

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

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(product: ProductsDTO) {
    this.cartService.removeFromCart(product);
    this.cartItems = this.cartService.getCartItems();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  createOrder(cartItems: ProductsDTO[]) {
    //TODO create order
  }
}
