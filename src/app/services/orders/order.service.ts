import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AxiosService} from "../axios/axios.service";
import {UsersDTO} from "../../model/users";
import {OrderDTO} from "../../model/orders";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductsDTO} from "../../model/products";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private axiosService: AxiosService, private snackBar: MatSnackBar, private orderService: OrderService) { }

  async getAllOrders(): Promise<any[]> {
    try {
      const response = await this.axiosService.request(
        'GET',
        'http://localhost:8080/api/orders/',
        {}
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error while fetching orders:', error);
      return [];
    }
  }

}
