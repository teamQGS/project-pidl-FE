import { Component, OnInit } from '@angular/core';
import { NgForOf } from "@angular/common";
import { ProductsDTO } from "../model/products";
import { ProductsService } from "../services/products/products.service";
import {NavigationExtras, RouterLink} from "@angular/router";
import { MatButton, MatFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { Router } from "@angular/router";
import { AxiosService } from "../services/axios/axios.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    MatButton,
    MatIcon,
    MatTooltip,
    RouterLink,
    MatFabButton,
    SearchComponent
  ],
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

  products: ProductsDTO[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private axiosService: AxiosService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productsService.getAll().then(products => {
      this.products = products;
    }).catch(error => {
      console.error('Error while fetching products:', error);
    });
  }

  navigateToAddPage(): void {
    this.router.navigate(['add-product']).then(r => {});
  }
  navigateToOrderMonitoringPage(): void {
    this.router.navigate(['order-monitoring']).then(r => {});
  }
  navigateToUpdateProductPage(productId: number): void {
    // Define navigation extras including the product ID as a query parameter
    const navigationExtras: NavigationExtras = {
      queryParams: {
        productId: productId
      }
    };

    // Navigate to the update product page with the product ID as a query parameter
    this.router.navigate(['update-product'], navigationExtras).then(r => {});
  }


  deleteProduct(product: ProductsDTO) {
    this.axiosService.request(
      'DELETE',
      `api/products/delete/${product.id}`,
      {}
    ).then(response => {
      this.snackBar.open("Product deleted", '', {
        duration: 3000
      });
      this.products = this.products.filter(p => p.id !== product.id);
    }).catch(error => {
      console.log(product);
      console.error('Error during delete:', error);
    });
  }
  updateProduct(product: ProductsDTO) {
    this.axiosService.request(
      'PUT',
      `api/products/update/${product.id}`,
      {
        name: product.name,
        description: product.description,
        price: product.price,
        illustration: product.illustration,
        count: product.count
      }
    ).then(response => {
      this.snackBar.open("Product updated", '', {
        duration: 3000
      });
      this.products = this.products.filter(p => p.id !== product.id);
    }).catch(error => {
      console.log(product);
      console.error('Error during update:', error);
    });
  }

}
