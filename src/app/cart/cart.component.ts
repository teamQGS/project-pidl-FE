import {Component, OnInit} from '@angular/core';
import {CartService} from "../services/cart/cart.service";
import {ProductsDTO} from "../model/products";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CartDTO} from "../model/cart";

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
  cart: CartDTO = new CartDTO();
  count: number = 0;

  constructor(private cartService: CartService, private snackBar: MatSnackBar) { }

  async ngOnInit(): Promise<void> {
    this.cart = await this.cartService.loadCart();
    console.log(this.cart);
    this.cartItems = this.cart.products;
  }


  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId)
      .then(() => {
        this.cartItems = this.cartItems.filter(product => product.id !== productId);
        this.snackBar.open("Product removed from cart", '', {
          duration: 3000
        });
      })
      .catch(error => {
        this.snackBar.open("Some error", '', {
          duration: 3000
        });
      });
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.snackBar.open("The cart has been emptied", '', {
      duration: 3000
    });
  }

  createOrder(cartItems: ProductsDTO[]) {
    //TODO create order
  }
}
