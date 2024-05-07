import { Component, HostListener } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgIf, NgOptimizedImage } from "@angular/common";
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    NgIf,
    SearchComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // v1.0.0 icons
  logoLightPath = 'assets/logo/logo-light.svg';
  cartIconPath = 'assets/icons/cart-icon.svg';
  employeeIconPath = 'assets/icons/employee-icon.svg';
  customerIconPath = 'assets/icons/customer-icon.svg';
  managerIconPath = 'assets/icons/manager-icon.svg';
  administratorIconPath = 'assets/icons/administrator-icon.svg';
  menuIconPath = 'assets/icons/menu-icon.svg';
  
  dashboardValue: String[] = ["User Dashboard", "Admin Dashboard", "Manager Dashboard"];
  protected readonly window = window;

  showDashboardList = false;

  toggleDashboardList(event: MouseEvent): void {
    event.stopPropagation();
    this.showDashboardList = !this.showDashboardList;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = event
    .composedPath()
    .some(el => (el as HTMLElement).classList?.contains('dashboard-list'));
    if (!clickedInside) {
      this.showDashboardList = false;
    }
  }
}
