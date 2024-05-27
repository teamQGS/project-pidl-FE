import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { NgZone } from '@angular/core';
import { OrderService } from '../services/orders/order.service';
import { ThemeService } from '../services/theme.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    NgIf,
    SearchComponent,
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // v1.0.0 icons
  logoLightPath = 'assets/logo/logo-light.svg';
  cartIconPath = 'assets/icons/cart-icon.svg';
  employeeIconPath = 'assets/icons/employee-icon.svg';
  customerIconPath = 'assets/icons/customer-icon.svg';
  managerIconPath = 'assets/icons/manager-icon.svg';
  administratorIconPath = 'assets/icons/administrator-icon.svg';
  menuIconPath = 'assets/icons/menu-icon.svg';
  loginIconPath = 'assets/icons/login-icon.svg';
  activeOrderIconPath = 'assets/icons/active-order-icon.svg';
  lightThemeIconPath = 'assets/icons/light-theme-icon.svg';

  dashboardValue: String[] = ["User Dashboard", "Admin Dashboard", "Manager Dashboard"];
  protected readonly window = window;

  showDashboardList = false;
  showMobileMenu = false;
  role = window.localStorage.getItem('role');

  toggleDashboardList(event: MouseEvent): void {
    event.stopPropagation();
    this.showDashboardList = !this.showDashboardList;
  }

  toggleMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
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

  isLoggedIn = false;
  private authSubscription: Subscription;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService,
    private zone: NgZone,
    private themeService: ThemeService
  ) {
    this.authSubscription = this.authService.isLoggedIn.subscribe(status => {
      this.zone.run(() => {
        this.isLoggedIn = status;
        console.log("Login status changed:", status);
      });
    });
  }

  ngOnInit(): void {
    this.checkActiveOrder();
    this.themeService.loadTheme();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  activeOrder: boolean | undefined;

  async checkActiveOrder(): Promise<void> {
    this.activeOrder = await this.orderService.getActiveOrder();
  }

  async redirectToCartOrActiveOrder(): Promise<void> {
    await this.checkActiveOrder();
    console.log(this.activeOrder);
    if (this.activeOrder) {
      this.router.navigate(['/active-order']); // Редирект на страницу активного заказа
    } else {
      this.router.navigate(['/cart']); // Редирект на страницу корзины
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
