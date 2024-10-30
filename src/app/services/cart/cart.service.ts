import { Injectable } from '@angular/core';
import {ProductsDTO} from "../../model/products";
import {CartDTO} from "../../model/cart";
import {AxiosService} from "../axios/axios.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartDTO = new CartDTO();

  constructor(private axiosService: AxiosService, private snackBar: MatSnackBar) {
  }

  async loadCart() {
  let username = window.localStorage.getItem('username')
    try {
      const response = await this.axiosService.request(
        'GET',
        `/api/cart/${username}`,
        {}
      );
      this.cart = response.data;
      return this.cart;
    } catch (error) {
      console.error('Error loading cart:', error);
      throw error;
    }
  }


  addToCart(productId: number) {
    let username = window.localStorage.getItem('username')
    this.axiosService.request(
      'PUT',
      `/api/cart/${username}/add`,
      productId
    ).then(response => {
      this.cart.products = response.data;
    }).catch(error => {
      this.snackBar.open("Some error", '', {
        duration: 3000
      });
    })
  }

  async removeFromCart(productId: number): Promise<any> {
    let username = window.localStorage.getItem('username')
    try {
      const response = await this.axiosService.request(
        'PUT',
        `/api/cart/${username}/remove`,
        productId
      );
      this.cart.products = response.data;
      return response.data;
    } catch (error) {
      throw error;
    }
  }


  clearCart() {
    let username = window.localStorage.getItem('username')
    this.axiosService.request(
      'PUT',
      `/api/cart/${username}/clear`,
      {}
    ).then(response => {
      this.cart.products = response.data;
    }).catch(error => {
      this.snackBar.open("Some error", '', {
        duration: 3000
      });
    })
  }

  decreaseCount(productId: number) {
    let username = window.localStorage.getItem('username')
    this.axiosService.request(
      'PUT',
      `/api/cart/${username}/decrease`,
      productId
    ).then(response => {
      this.cart.products = response.data;
    }).catch(error => {
      this.snackBar.open("Some error", '', {
        duration: 3000
      });
    })
  }

  increaseCount(productId: number) {
    let username = window.localStorage.getItem('username')
    this.axiosService.request(
      'PUT',
      `/api/cart/${username}/increase`,
      productId
    ).then(response => {
      this.cart.products = response.data;
    }).catch(error => {
      this.snackBar.open("Some error", '', {
        duration: 3000
      });
    })
  }
}
