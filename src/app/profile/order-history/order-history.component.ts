import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ProductsDTO} from "../../model/products";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {OrderDTO} from "../../model/orders";
import {OrderService} from "../../services/orders/order.service";

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    MatButton,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {
  orders: OrderDTO[] = [];
  products: ProductsDTO[] = [];
  selectedStatus: never[] = [];
  username = window.localStorage.getItem('username');

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getCustomersOrders().then((orders: OrderDTO[]) => {
      this.orders = orders;
      // @ts-ignore
      this.selectedStatus = this.orders.map(order => order.status);
    }).catch((error: any) => {
      console.error('Error while fetching products:', error);
    });
  }

  formatDate(dateString: Date): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Use 24-hour format
    };
    return date.toLocaleDateString('en-GB', options);
  }


}
