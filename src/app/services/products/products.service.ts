import { Injectable } from '@angular/core';
import {ProductsDTO} from "../../model/products";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getAll() :ProductsDTO[]{
    return [
      {
        id:"first",
        name: "Fast Food",
        description: "The best chicken in the world!",
        price: 20,
        illustrationUrl: "../assets/images/fast_food.jpg"
      },
      {
        id:"second",
        name: "Cart",
        description: "The best chicken in the world!",
        price: 20,
        illustrationUrl: "../assets/images/cart.jpg"
      },
      {
        id:"third",
        name: "Kebab",
        description: "The best chicken in the world!",
        price: 20,
        illustrationUrl: "../assets/images/kebab.jpg"
      },
      {
        id:"fourth",
        name: "Sandwich",
        description: "The best chicken in the world!",
        price: 20,
        illustrationUrl: "../assets/images/sandwich.jpg"
      },

    ]
}
}
