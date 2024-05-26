import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AxiosService} from "../axios/axios.service";
import {AddressDTO} from "../../model/address";

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  username = window.localStorage.getItem("username");
  private address: AddressDTO = new AddressDTO();

  constructor(private snackBar: MatSnackBar, private axiosService: AxiosService) {
  }

  async getAddressByUsername(username: string): Promise<AddressDTO> {
    try {
      const response = await this.axiosService.request(
        'GET',
        `/api/address/${username}`,
        {}
      );
      this.address = response.data;
      return this.address;
    } catch (error) {
      this.snackBar.open("Some error", '', {
        duration: 3000
      });
      throw error;
    }
  }

  async updateAddress(address: AddressDTO): Promise<void> {
    try {
      const response = await this.axiosService.request(
        'PUT',
        `/api/address/update/${this.username}`,
        address
      );
      this.snackBar.open("Address updated successfully", '', {
        duration: 3000
      });
    } catch (error) {
      this.snackBar.open("Error updating address", '', {
        duration: 3000
      });
      throw error;
    }
  }
}
