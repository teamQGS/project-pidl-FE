import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AxiosService} from "../../services/axios/axios.service";
import {OrderDTO} from "../../model/orders";
import {ProductsDTO} from "../../model/products";
import {OrderService} from "../../services/orders/order.service";


@Component({
  selector: 'app-order-monitoring',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf
  ],
  templateUrl: './order-monitoring.component.html',
  styleUrl: './order-monitoring.component.css'
})
export class OrderMonitoringComponent implements OnInit {
  orders: OrderDTO[] = [];
  products: ProductsDTO[] = [];
  selectedStatus: never[] = [];
  constructor(private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar, private axiosService: AxiosService, private orderService: OrderService) {

  }

  ngOnInit(): void {
    this.orderService.getAllOrders().then((orders: OrderDTO[]) => {
      this.orders = orders;
      // @ts-ignore
      this.selectedStatus = this.orders.map(order => order.status);
    }).catch((error: any) => {
      console.error('Error while fetching products:', error);
    });
  }
  assignStatus(order: OrderDTO, selectedStatus: string): void {

    this.axiosService.request(
      'PUT',
      `/api/orders/changeStatus/${order.id}`,
      selectedStatus
    ).then(response => {
      this.snackBar.open('Status assigned successfully:', '', {
        duration: 3000
      });
      this.orderService.getAllOrders().then(orders => {
        this.orders = orders;
      }).catch(error => {
        console.error('Error while fetching orders', error);
      });
    }).catch(error => {
      this.snackBar.open('Order already has this status ', '', {
        duration: 3000
      });
    });
  }
}
