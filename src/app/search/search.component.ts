import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductsService } from '../services/products/products.service';
import { ProductsDTO } from '../model/products';
import { NgForOf, NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';

interface Category {
  name: string;
  image: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    NgClass
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchControl: FormControl = new FormControl();
  products: ProductsDTO[] = [];
  isExpanded: boolean = false;
  showCatalog: boolean = false;
  categories: Category[] = [
    { name: 'FRUITS', image: 'path/to/fruit.jpg' },
    { name: 'Vegetables', image: 'path/to/vegetables.jpg' },
    { name: 'Meat', image: 'path/to/meat.jpg' },
    { name: 'Fish and Seafood', image: 'path/to/fish.jpg' },
    { name: 'Dairy Products', image: 'path/to/dairy.jpg' },
    { name: 'Grains and Legumes', image: 'path/to/grains.jpg' },
    { name: 'Bakery and Pastries', image: 'path/to/bakery.jpg' },
    { name: 'Beverages', image: 'path/to/beverages.jpg' },
    { name: 'Sweets', image: 'path/to/sweets.jpg' },
    { name: 'Frozen Products', image: 'path/to/frozen.jpg' },
    { name: 'Canned Goods', image: 'path/to/canned.jpg' },
    { name: 'Sauces and Condiments', image: 'path/to/sauces.jpg' },
    { name: 'Nuts and Dried Fruits', image: 'path/to/nuts.jpg' },
    { name: 'Snacks', image: 'path/to/snacks.jpg' },
    { name: 'Alcoholic Beverages', image: 'path/to/alcohol.jpg' },
    { name: 'Adult Products', image: 'path/to/adult-products.jpg' }
  ];
  @Output() searchResults = new EventEmitter<ProductsDTO[]>();
  @Output() searchTermChange = new EventEmitter<boolean>();
  @Output() categorySelected = new EventEmitter<string>();

  constructor(private productsService: ProductsService, private router: Router) {
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => {
      this.search(value);
      this.searchTermChange.emit(!!value);
    });
  }

  async search(searchTerm: string): Promise<void> {
    if (searchTerm) {
      try {
        const products = await this.productsService.searchProducts(searchTerm);
        this.products = products;
        this.searchResults.emit(this.products);
      } catch (error) {
        console.error('Error while searching products:', error);
        this.products = [];
        this.searchResults.emit(this.products);
      }
    } else {
      try {
        const products = await this.productsService.getAll();
        this.products = products;
        this.searchResults.emit(this.products);
      } catch (error) {
        console.error('Error while fetching all products:', error);
        this.products = [];
        this.searchResults.emit(this.products);
      }
    }
  }

  onSearch(): void {
    const searchTerm = this.searchControl.value;
    if (searchTerm) {
      this.router.navigate(['/search', searchTerm]);
    }
  }

  expandInput(isFocused: boolean): void {
    this.isExpanded = isFocused;
  }

  toggleCatalog(): void {
    this.showCatalog = !this.showCatalog;
  }

  selectCategory(categoryName: string): void {
    this.categorySelected.emit(categoryName);
    this.toggleCatalog();
  }
}
