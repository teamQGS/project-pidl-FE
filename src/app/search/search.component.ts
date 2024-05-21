import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductsService } from '../services/products/products.service';
import { ProductsDTO } from '../model/products';
import { NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchControl: FormControl = new FormControl();
  products: ProductsDTO[] = [];

  @Output() searchResults = new EventEmitter<ProductsDTO[]>();

  constructor(private productsService: ProductsService, private router: Router) {
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => this.search(value));
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
}
