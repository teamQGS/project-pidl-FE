import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { ProductsDTO } from '../model/products';
import { NgForOf, NgIf } from '@angular/common';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartDTO } from '../model/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgForOf, MatFabButton, NgIf, MatButton, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {

  // v1.0.0 icons
  sadBananaPath = 'assets/illustrations/sad-banana-illustration.svg';
  removeIconPath = 'assets/icons/remove-icon.svg';

  cartItems: ProductsDTO[] = [];
  cart: CartDTO = new CartDTO();
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    this.cart = await this.cartService.loadCart();
    console.log(this.cart);
    this.cartItems = this.cart.products;
    this.calculateTotalPrice();
  }

  removeFromCart(productId: string) {
    this.cartService
      .removeFromCart(productId)
      .then(() => {
        this.cartItems = this.cartItems.filter(
          (product) => product.id !== productId
        );
        this.calculateTotalPrice();
        this.snackBar.open('Product removed from cart', '', {
          duration: 3000,
        });
      })
      .catch((error) => {
        this.snackBar.open('Some error', '', {
          duration: 3000,
        });
      });
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.calculateTotalPrice();
    this.snackBar.open('The cart has been emptied', '', {
      duration: 3000,
    });
  }

  createOrder(cartItems: ProductsDTO[]) {
    //TODO create order
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    this.cartItems.forEach(item => {
      const price = item.price * item.count;
      this.totalPrice += price;
    });
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
  }

  roundPrice(value: number): number {
    return parseFloat(value.toFixed(2));
  }

  increaseCount(productId: string) {
    let product = this.cartItems.find((product) => product.id === productId);
    if (product) {
      product.count++;
      this.cartService.increaseCount(productId);
    }
    this.calculateTotalPrice();
  }

  decreaseCount(productId: string) {
    let product = this.cartItems.find((product) => product.id === productId);
    if (product) {
      if (product.count > 1) {
        product.count--;
        this.cartService.decreaseCount(productId);
      } else {
        this.removeFromCart(productId);
      }
      this.calculateTotalPrice();
    }
  }
}
