import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {ProductsDTO} from "../model/products";
import {ProductsService} from "../services/products/products.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    MatButton,
    MatIcon,
    MatTooltip,
    RouterLink
  ],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent {

  products: ProductsDTO[] = [];
  constructor(private productsService: ProductsService, private route: Router) {
  }

  ngOnInit(): void {
    this.productsService.getAll().then(products => {
      this.products = products;
    }).catch(error => {
      console.error('Error while fetching products:', error);
    });
  }

  navigateToAddPage(): void {
    this.route.navigate(['add-product'])
  }
}
