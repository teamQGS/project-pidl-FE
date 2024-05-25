import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ProductsService} from '../services/products/products.service';
import {ProductsDTO} from '../model/products';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {Renderer2} from '@angular/core';

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
    { name: 'FRUITS', image: 'assets/illustrations/fruits.svg', description: "Fruits"},
    { name: 'VEGETABLES', image: 'assets/illustrations/vegetables.svg', description: "Vegetables" },
    { name: 'MEAT', image: 'assets/illustrations/meat.svg', description: "Meat" },
    { name: 'SEAFOOD', image: 'assets/illustrations/seafood.svg', description: "Fish and Seafood" },
    { name: 'DAIRY', image: 'assets/illustrations/dairy.svg', description: "Dairy Products" },
    { name: 'CEREALS', image: 'assets/illustrations/cereals.svg', description: "Grains and Legumes" },
    { name: 'PASTRIES', image: 'assets/illustrations/pastries.svg', description: "Bakery and Pastries" },
    { name: 'BEVERAGES', image: 'assets/illustrations/beverages.svg', description: "Beverages" },
    { name: 'SWEETS', image: 'assets/illustrations/sweets.svg', description: "Sweets" },
    { name: 'FROZENFOOD', image: 'assets/illustrations/frozenfood.svg', description: "Frozen Products" },
    { name: 'CANNED', image: 'assets/illustrations/canned.svg', description: "Canned Goods" },
    { name: 'CONDIMENTS', image: 'assets/illustrations/condiments.svg', description: "Sauces and Condiments" },
    { name: 'NUTS', image: 'assets/illustrations/nuts.svg', description: "Nuts and Dried Fruits" },
    { name: 'SNACKS', image: 'assets/illustrations/snacks.svg', description: "Snacks" },
    { name: 'ALCOHOL', image: 'assets/illustrations/alcohol.svg', description: "Alcoholic Beverages" },
    { name: 'ADULT', image: 'assets/illustrations/adult.svg', description: "Adult Products" }
  ];
  @Output() searchResults = new EventEmitter<ProductsDTO[]>();
  @Output() searchTermChange = new EventEmitter<boolean>();
  @Output() categorySelected = new EventEmitter<string>();

  constructor(private productsService: ProductsService, private router: Router, private renderer: Renderer2) {
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

  // expandInput(isFocused: boolean): void {
  //   this.isExpanded = isFocused;
  // }

  toggleCatalog(): void {
    this.showCatalog = !this.showCatalog;
  }

  selectCategory(categoryName: string): void {
    this.categorySelected.emit(categoryName);
    this.toggleCatalog();
  }
}
