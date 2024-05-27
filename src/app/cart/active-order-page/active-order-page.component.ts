import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AxiosService} from "../../services/axios/axios.service";
import {Router} from "@angular/router";
import {OrderDTO} from "../../model/orders";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-active-order-page',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './active-order-page.component.html',
  styleUrl: './active-order-page.component.css'
})
export class ActiveOrderPageComponent implements OnInit{
  constructor(
    private snackBar: MatSnackBar,
    private axiosService: AxiosService,
    private router: Router,
  ){}

  username = window.localStorage.getItem("username");
  order: OrderDTO | undefined;
  date: Date | undefined;
  ngOnInit(): void {
    this.axiosService.request(
      "GET",
      `/api/orders/find/${this.username}`,
      {}
    ).then(response=>{
      this.order = response.data;
      this.date = new Date(response.data.date);
      }
    ).catch(error=>{
      this.snackBar.open('Order not exists', '', {
        duration: 3000
      })});
  }

  cancelOrder() {
    // @ts-ignore
    const orderId = this.order.id;
    this.axiosService.request(
      "PUT",
      `/api/orders/changeStatus/${orderId}`,
      "CANCELED"
    ).then(response=>{
        this.order = response.data;
        this.date = new Date(response.data.date);
      }
    ).catch(error=>{
      this.snackBar.open('Problem with cancelling', '', {
        duration: 3000
      })});
  }

  goToHomePage(): void {
    this.router.navigate(['/']); // Перенаправление на главную страницу
  }
}
