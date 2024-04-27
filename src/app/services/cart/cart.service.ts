import { Injectable } from '@angular/core';
import {ProductsDTO} from "../../model/products";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: ProductsDTO[] = [];

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
    }
  }

  addToCart(product: ProductsDTO) {
    this.cartItems.push(product);
    this.updateLocalStorage();
  }

  removeFromCart(product: ProductsDTO) {
    const index = this.cartItems.indexOf(product);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.updateLocalStorage();
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  private updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart');
  }
}
