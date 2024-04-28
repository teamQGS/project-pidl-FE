import { Injectable } from '@angular/core';
import {AxiosService} from "../axios/axios.service";
import {ProductsDTO} from "../../model/products";
import {UsersDTO} from "../../model/users";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private axiosService: AxiosService) { }

  async getAll(): Promise<UsersDTO[]> {
    try {
      const response = await this.axiosService.request(
        'GET',
        'http://localhost:8080/api/admin',
        {}
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error while fetching users:', error);
      return [];
    }
  }
}
