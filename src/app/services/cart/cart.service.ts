import { Injectable } from '@angular/core';
import {ProductsDTO} from "../../model/products";
import {CartDTO} from "../../model/cart";
import {AxiosService} from "../axios/axios.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartDTO = new CartDTO();

  constructor(private axiosService: AxiosService) {
  }

  async loadCart() {
    const username = window.localStorage.getItem('username');
      this.axiosService.request(
        'GET',
        `/api/cart/${username}`,
        {}
      ).then(response => {
        this.cart = response.data;
      });
  }

  addToCart(product: ProductsDTO) {

  }

  removeFromCart(product: ProductsDTO) {

  }

  getCartItems() {

  }

  clearCart() {

  }
}
