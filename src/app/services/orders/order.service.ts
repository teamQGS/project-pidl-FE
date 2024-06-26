import { Injectable } from '@angular/core';
import {AxiosService} from "../axios/axios.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  username = window.localStorage.getItem('username');

  constructor(private axiosService: AxiosService, private snackBar: MatSnackBar) { }

  async getAllOrders(): Promise<any[]> {
    try {
      const response = await this.axiosService.request(
        'GET',
        '/api/manager/orders',
        {}
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error while fetching orders:', error);
      return [];
    }
  }

  async getCustomersOrders(): Promise<any[]> {
    try {
      const response = await this.axiosService.request(
        'GET',
        `/api/orders/findAll/${(this.username)}`,
        {}
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error while fetching orders:', error);
      return [];
    }
  }

  async getActiveOrder(): Promise<boolean> {
    try {
      const response = await this.axiosService.request(
        "GET",
        `/api/orders/find/${this.username}`,
        {}
      );
      return !!response.data;
    } catch (error) {
      return false;
    }
  }


}
