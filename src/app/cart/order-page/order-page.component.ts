import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AxiosService} from "../../services/axios/axios.service";
import {AddressService} from "../../services/adress/address.service";
import {AddressDTO} from "../../model/address";
import {HeaderComponent} from "../../header/header.component";

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private axiosService: AxiosService,
    private router: Router,
    private addressService: AddressService
  ) {
    this.addressForm = this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      house: ['', Validators.required],
      postcode: ['', Validators.required],
      countrycode: ['', Validators.required]
    });
  }
  addressForm: FormGroup;
  username = window.localStorage.getItem("username");
  ngOnInit(): void {
    if (this.username) {
      this.addressService.getAddressByUsername(this.username).then(address => {
        this.addressForm.patchValue(address);
      }).catch(error => {
        console.error('Error fetching address:', error);
      });
    }
  }

  onSubmit(): void {
    const address: AddressDTO = this.addressForm.value;
    address.username = this.username!;
    this.addressService.updateAddress(address).then(() => {
      this.axiosService.request(
        'POST',
        `/api/orders/create/${this.username}`,
        address
      ).then(response => {
        const orderId = response.data.id;
        this.router.navigate(['/active-order']);
        this.snackBar.open('Order was successfully created', '', {
          duration: 3000
        });
      }).catch(error => {
        console.error('Error creating order:', error);
        this.snackBar.open('Error creating order', '', {
          duration: 3000
        });
      });
    }).catch(error => {
      console.error('Error updating address:', error);
    });
  }
}
