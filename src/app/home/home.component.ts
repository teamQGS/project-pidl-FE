import { Component } from '@angular/core';
import {ProductsService} from "../services/products/products.service";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {ProductsDTO} from "../models/products";
import {ActivatedRoute} from "@angular/router";
import {SearchComponent} from "../search/search.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    SearchComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  products: ProductsDTO[] = [];
  constructor(private productsService: ProductsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['searchTerm'])
        this.products = this.productsService.getAll().filter(products =>
          products.name.toLowerCase().includes(params['searchTerm'].toLowerCase()));
      else
        this.products = this.productsService.getAll()
    });

  }

}
