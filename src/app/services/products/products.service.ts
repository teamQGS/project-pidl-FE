import { Injectable } from '@angular/core';
import { ProductsDTO } from "../../model/products";
import { AxiosService } from "../axios/axios.service";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private axiosService: AxiosService) {
  }

  async getAll(): Promise<ProductsDTO[]> {
    try {
      const response = await this.axiosService.request(
        'GET',
        '/api/products',
        {}
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error while fetching products:', error);
      return [];
    }
  }

  async searchProducts(searchTerm: string): Promise<ProductsDTO[]> {
    try {
      const response = await this.axiosService.request(
        'GET',
        `/api/products/search?name=${encodeURIComponent(searchTerm)}`,
        {}
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error while searching products:', error);
      return [];
    }
  }

  async getProductsByCategory(category: string): Promise<ProductsDTO[]> {
    try {
      const response = await this.axiosService.request(
        'GET',
        `/api/products/category/${category}`,
        {}
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(`Error while fetching products for category ${category}:`, error);
      return [];
    }
  }

  // Get all categories
  async getCategories(): Promise<any> {
    try {
      const response = await this.axiosService.request(
        'GET',
        '/api/products/categories',
        {}
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error while fetching categories:', error);
      return [];
    }
  }
}
