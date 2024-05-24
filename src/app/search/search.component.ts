import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ProductsService} from '../services/products/products.service';
import {ProductsDTO} from '../model/products';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';

interface Category {
  name: string;
  image: string;
  description: string;
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
    { name: 'FRUITS', image: 'path/to/fruit.jpg', description: "Fruits"},
    { name: 'VEGETABLES', image: 'path/to/vegetables.jpg', description: "Vegetables" },
    { name: 'MEAT', image: 'path/to/meat.jpg', description: "Meat" },
    { name: 'SEAFOOD', image: 'path/to/fish.jpg', description: "Fish and Seafood" },
    { name: 'DAIRY', image: 'path/to/dairy.jpg', description: "Dairy Products" },
    { name: 'CEREALS', image: 'path/to/grains.jpg', description: "Grains and Legumes" },
    { name: 'PASTRIES', image: 'path/to/bakery.jpg', description: "Bakery and Pastries" },
    { name: 'BEVERAGES', image: 'path/to/beverages.jpg', description: "Beverages" },
    { name: 'SWEETS', image: 'path/to/sweets.jpg', description: "Sweets" },
    { name: 'FROZENFOOD', image: 'path/to/frozen.jpg', description: "Frozen Products" },
    { name: 'CANNED', image: 'path/to/canned.jpg', description: "Canned Goods" },
    { name: 'CONDIMENTS', image: 'path/to/sauces.jpg', description: "Sauces and Condiments" },
    { name: 'NUTS', image: 'path/to/nuts.jpg', description: "Nuts and Dried Fruits" },
    { name: 'SNACKS', image: 'path/to/snacks.jpg', description: "Snacks" },
    { name: 'ALCOHOL', image: 'path/to/alcohol.jpg', description: "Alcoholic Beverages" }
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
        this.products = await this.productsService.searchProducts(searchTerm);
        this.searchResults.emit(this.products);
      } catch (error) {
        console.error('Error while searching products:', error);
        this.products = [];
        this.searchResults.emit(this.products);
      }
    } else {
      try {
        this.products = await this.productsService.getAll();
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
