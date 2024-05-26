import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { ProductsDTO } from '../model/products';
import { SearchComponent } from '../search/search.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../services/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    SearchComponent,
    MatIconModule,
    MatButtonModule,
    ProductDetailsComponent,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild(SearchComponent) searchComponent!: SearchComponent;

  selectedProduct: ProductsDTO | null = null;
  products: ProductsDTO[] = [];
  paginatedProducts: ProductsDTO[] = [];
  productsLoaded: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalPages: number = 1;
  showMarketing: boolean = true;
  selectedCategory: string | null = null;
  searchResults: ProductsDTO[] = [];
  isSearching: boolean = false;
  searchTerm: string = '';

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

  currentIndices: { [category: string]: number } = {};
  dragging: { [category: string]: boolean } = {};
  startX: number = 0;
  scrollLeft: number = 0;
  showGradient: { [category: string]: boolean } = {};

  get currentSlideImage(): string {
    return this.slideImages[this.currentSlideIndex];
  }

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  ngOnDestroy(): void {
    clearInterval(this.slideInterval);
  }

  async loadCategories(): Promise<void> {
    try {
      this.categories = await this.productsService.getCategories();
      if (this.categories.length > 0) {
        this.loadProducts();
      }
    } catch (error) {
      console.error('Error while fetching categories:', error);
    }
  }

  loadProducts(): void {
    this.productsService
      .getAll()
      .then((products: ProductsDTO[]) => {
        this.products = products;
        this.categorizeProducts();
        this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
        this.updatePaginatedProducts();
        this.productsLoaded = true;
        for (let category of this.categories) {
          this.currentIndices[category] = 0;
          this.dragging[category] = false;
          this.showGradient[category] = true; // Initialize the gradient visibility
        }
      })
      .catch((error: any) => {
        console.error('Error while fetching products:', error);
      });
  }

  onSearchResults(products: ProductsDTO[]): void {
    this.searchResults = products;
    this.isSearching = products.length > 0;
    this.filterSearchResults();
  }

  onSearchTermChange(hasSearchTerm: boolean): void {
    this.showMarketing = !hasSearchTerm;
    if (!hasSearchTerm) {
      this.isSearching = false;
      this.searchTerm = '';
      this.loadProducts(); // Reload all products when search term is cleared
    }
  }

  onCategorySelected(categoryName: string): void {
    this.selectedCategory = categoryName;
    this.clearSearch();
    this.filterSearchResults();
  }

  clearCategory(): void {
    this.selectedCategory = null;
    this.isSearching = false;
    this.searchTerm = '';
    this.loadProducts();
  }

  selectProduct(product: ProductsDTO): void {
    // If the same product is clicked again, reset selectedProduct to allow re-selection
    if (this.selectedProduct && this.selectedProduct.id === product.id) {
      this.selectedProduct = null;
      setTimeout(() => this.selectedProduct = product, 0); // Allow re-selection after a tiny delay
    } else {
      this.selectedProduct = product;
    }
  }

  addToCart(productId: string): void {
    this.cartService.addToCart(productId);
    this.snackBar.open('Product was added to cart', '', { duration: 3000 });
  }

  previousSlide(): void {
    this.currentSlideIndex = this.currentSlideIndex > 0 ? this.currentSlideIndex - 1 : this.slideImages.length - 1;
    this.resetProgressBar();
  }

  nextSlide(): void {
    this.currentSlideIndex = this.currentSlideIndex < this.slideImages.length - 1 ? this.currentSlideIndex + 1 : 0;
    this.resetProgressBar();
  }

  startSlideShow(): void {
    this.slideInterval = setInterval(() => {
      this.progressBarWidth += 1;
      if (this.progressBarWidth >= 100) {
        this.nextSlide();
      }
    }, 100);
  }

  resetProgressBar(): void {
    if (this.isFirstTransition) {
      this.isFirstTransition = false;
      setTimeout(() => {
        this.progressBarWidth = 0;
        this.startSlideShow();
      }, 100);
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

  categories: string[] = [];

  categorizedProducts: { [category: string]: ProductsDTO[] } = {};

  categorizeProducts(): void {
    this.categorizedProducts = {};
    this.products.forEach(product => {
      const category = product.productCategory;
      if (category) {
        if (!this.categorizedProducts[category]) {
          this.categorizedProducts[category] = [];
        }
        this.categorizedProducts[category].push(product);
      }
    });
  }

  getCategorizedProducts(category: string | null): ProductsDTO[] {
    if (!category) {
      return [];
    }
    return this.categorizedProducts[category] || [];
  }

  loadCategoryProducts(categoryName: string): void {
    this.productsService
      .getProductsByCategory(categoryName)
      .then((products: ProductsDTO[]) => {
        this.products = products;
        this.categorizeProducts();
        this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
        this.updatePaginatedProducts();
      })
      .catch((error: any) => {
        console.error(`Error while fetching products for category ${categoryName}:`, error);
      });
  }

  filterSearchResults(): void {
    if (this.isSearching) {
      if (this.selectedCategory) {
        this.searchResults = this.searchResults.filter(product => product.productCategory === this.selectedCategory);
      } else {
        // Reload search results if category is cleared
        this.onSearchResults(this.searchResults);
      }
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.isSearching = false;
    if (this.searchComponent) {
      this.searchComponent.clearSearchField();
    }
  }

  checkScroll(event: Event, category: string): void {
    const target = event.target as HTMLElement;
    if (target) {
      this.showGradient[category] = target.scrollWidth > target.scrollLeft + target.clientWidth;
    }
  }

  get displayProducts(): ProductsDTO[] {
    if (this.isSearching) {
      return this.searchResults;
    }
    if (this.selectedCategory) {
      return this.getCategorizedProducts(this.selectedCategory);
    }
    return [];
  }

  get displayHeader(): string {
    if (this.isSearching && this.selectedCategory) {
      return `Search Results in ${this.selectedCategory}`;
    }
    if (this.isSearching) {
      return 'Search Results';
    }
    if (this.selectedCategory) {
      return this.selectedCategory;
    }
    return '';
  }
}
