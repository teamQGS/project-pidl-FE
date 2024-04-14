import { Injectable } from '@angular/core';
import {ProductsDTO} from "../../model/products";
import {AxiosService} from "../axios/axios.service";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private axiosService: AxiosService) {
  }

  getAll(): Promise<ProductsDTO[]> {
    return this.axiosService.request(
      'GET',
      '/api/products',
      {}
    ).then(response => {
      console.log(response.data)
      return response.data;
    }).catch(error => {
      console.error('Error while fetching products:', error);
      return [];
    });
  }
}
