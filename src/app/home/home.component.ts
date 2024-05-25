import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { NgIf, NgClass, NgStyle } from '@angular/common';

interface Category {
  name: string;
  description: string;
}

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
    NgIf,
    NgClass,
    NgStyle
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  selectedProduct: ProductsDTO | null = null;
  products: ProductsDTO[] = [];
  paginatedProducts: ProductsDTO[] = [];
  productsLoaded: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalPages: number = 1;
  showMarketing: boolean = true;
  selectedCategory: string | null = null;

  nextIconPath: string = 'assets/icons/next-icon.svg';
  previousIconPath: string = 'assets/icons/previous-icon.svg';

  slideImages: string[] = [
    'assets/illustrations/marketing/welcome-pidl.webp',
    'assets/illustrations/marketing/new-adult-category.webp',
    'assets/illustrations/marketing/collab-edudate.webp'
  ];
  currentSlideIndex: number = 0;
  progressBarWidth: number = 0;
  slideInterval: any;
  isFirstTransition: boolean = true;

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
    this.startSlideShow();
  }

  ngOnDestroy(): void {
    clearInterval(this.slideInterval);
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
    this.resetProgressBar();
  }

  nextSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex < this.slideImages.length - 1) ? this.currentSlideIndex + 1 : 0;
    this.resetProgressBar();
  }

  startSlideShow(): void {
    this.slideInterval = setInterval(() => {
      this.progressBarWidth += 1;
      if (this.progressBarWidth >= 100) {
        this.nextSlide();
      }
    }, 100); // Adjust the interval as needed
  }

  resetProgressBar(): void {
    if (this.isFirstTransition) {
      this.isFirstTransition = false;
      setTimeout(() => {
        this.progressBarWidth = 0;
        this.startSlideShow();
      }, 100); // Delay before starting the first transition
    } else {
      this.progressBarWidth = 0;
    }
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
