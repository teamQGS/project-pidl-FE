import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ProductsDTO} from "../model/products";
import {ProductsService} from "../services/products/products.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {Router} from "@angular/router";
import {AxiosService} from "../services/axios/axios.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    MatButton,
    MatIcon,
    MatTooltip,
    RouterLink,
    MatFabButton
  ],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent implements OnInit{

  products: ProductsDTO[] = [];

  constructor(private productsService: ProductsService, private router: Router,
              private axiosService: AxiosService, private snackBar: MatSnackBar){
  }

  ngOnInit(): void {
    this.productsService.getAll().then(products => {
      this.products = products;
    }).catch(error => {
      console.error('Error while fetching products:', error);
    });
  }

  navigateToAddPage(): void {
    this.router.navigate(['add-product'])
  }
  deleteProduct(product: ProductsDTO) {
    console.log(product.id)
    this.axiosService.request(
      'DELETE',
      `api/products/delete/${product.id}`,
      {}
    ).then(response => {
      this.snackBar.open("Product deleted", '', {
        duration: 3000
      })
      this.products = this.products.filter(p => p.id !== product.id);
    }).catch(error => {
      console.log(product)
      console.log('Error during delete:', error);
    });
  }

}
