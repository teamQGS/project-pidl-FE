// home.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
import { NgForOf, NgOptimizedImage } from '@angular/common';
import { ProductsDTO } from '../model/products';
import { ActivatedRoute } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton, MatMiniFabButton } from '@angular/material/button';
import { CartService } from '../services/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    SearchComponent,
    MatIcon,
    MatFabButton,
    MatMiniFabButton,
    ProductDetailsComponent,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedProduct: ProductsDTO | null = null;
  products: ProductsDTO[] = [];
  paginatedProducts: ProductsDTO[] = [];
  productsLoaded: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalPages: number = 1;
  showMarketing: boolean = true;
  selectedCategory: string | null = null;

  slideImages: string[] = [
    'path/to/slide1.jpg',
    'path/to/slide2.jpg',
    'path/to/slide3.jpg'
  ];
  currentSlideIndex: number = 0;

  get currentSlideImage(): string {
    return this.slideImages[this.currentSlideIndex];
  }

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    if (this.selectedCategory) {
      this.loadCategoryProducts(this.selectedCategory);
    } else {
      this.productsService.getAll().then((products: ProductsDTO[]) => {
        this.products = products;
        this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
        this.updatePaginatedProducts();
        this.productsLoaded = true;
      }).catch((error: any) => {
        console.error('Error while fetching products:', error);
      });
    }
  }

  onSearchResults(products: ProductsDTO[]): void {
    this.products = products;
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.updatePaginatedProducts();
  }

  onSearchTermChange(hasSearchTerm: boolean): void {
    this.showMarketing = !hasSearchTerm;
  }

  onCategorySelected(categoryName: string): void {
    this.selectedCategory = categoryName;
    this.loadCategoryProducts(categoryName);
  }

  clearCategory(): void {
    this.selectedCategory = null;
    this.loadProducts();
  }

  loadCategoryProducts(categoryName: string): void {
    this.productsService.getProductsByCategory(categoryName).then((products: ProductsDTO[]) => {
      this.products = products;
      this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
      this.updatePaginatedProducts();
    }).catch((error: any) => {
      console.error(`Error while fetching products for category ${categoryName}:`, error);
    });
  }

  selectProduct(product: ProductsDTO): void {
    this.selectedProduct = product;
  }

  addToCart(productId: string): void {
    this.cartService.addToCart(productId);
    this.snackBar.open('Product was added to cart', '', {
      duration: 3000
    });
  }

  previousSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex > 0) ? this.currentSlideIndex - 1 : this.slideImages.length - 1;
  }

  nextSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex < this.slideImages.length - 1) ? this.currentSlideIndex + 1 : 0;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProducts();
    }
  }

  updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }
}
