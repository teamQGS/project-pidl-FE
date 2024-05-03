import { Injectable } from '@angular/core';
import {ProductsDTO} from "../../model/products";
import {CartDTO} from "../../model/cart";
import {AxiosService} from "../axios/axios.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private username = window.localStorage.getItem('username')

  private cart: CartDTO = new CartDTO();

  constructor(private axiosService: AxiosService, private snackBar: MatSnackBar) {
  }

  async loadCart() {
    try {
      const response = await this.axiosService.request(
        'GET',
        `/api/cart/${this.username}`,
        {}
      );
      this.cart = response.data;
      return this.cart;
    } catch (error) {
      console.error('Error loading cart:', error);
      throw error;
    }
  }


  addToCart(productId: string) {
    this.axiosService.request(
      'PUT',
      `/api/cart/${this.username}/add`,
      productId
    ).then(response => {
      this.cart.products = response.data;
    }).catch(error => {
      this.snackBar.open("Some error", '', {
        duration: 3000
      });
    })
  }

  async removeFromCart(productId: string): Promise<any> {
    try {
      const response = await this.axiosService.request(
        'PUT',
        `/api/cart/${this.username}/remove`,
        productId
      );
      this.cart.products = response.data;
      return response.data;
    } catch (error) {
      throw error;
    }
  }


  clearCart() {
    this.axiosService.request(
      'PUT',
      `/api/cart/${this.username}/clear`,
      {}
    ).then(response => {
      this.cart.products = response.data;
    }).catch(error => {
      this.snackBar.open("Some error", '', {
        duration: 3000
      });
    })
  }
}
