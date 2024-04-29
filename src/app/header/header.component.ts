import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgIf, NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // New icons
  logoPath = 'assets/logo/logo-sized.svg';
  dashboardListPath = 'assets/icons/dashboard-list.svg';
  shoppingCartPath = 'assets/icons/shopping-cart.svg';
  managerIconPath = 'assets/icons/manager-icon.svg';
  adminIconPath = 'assets/icons/admin-icon.svg';

  // Old icons
  userPath = 'assets/icons/user.svg';

  protected readonly window = window;

  showDashboardList = false;

  constructor() {
    // Установка изначального значения в false
    this.showDashboardList = false;
  }

  toggleDashboardList() {
    this.showDashboardList = !this.showDashboardList;
  }
}
