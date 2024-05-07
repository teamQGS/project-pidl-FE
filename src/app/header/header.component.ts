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

  // New icons
  logoPath = 'assets/logo/logo-sized.svg';
  dashboardListPath = 'assets/icons/dashboard-list.svg';
  shoppingCartPath = 'assets/icons/shopping-cart.svg';
  managerIconPath = 'assets/icons/manager-icon.svg';
  adminIconPath = 'assets/icons/admin-icon.svg';

  // Old icons
  userPath = 'assets/icons/user.svg';
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
