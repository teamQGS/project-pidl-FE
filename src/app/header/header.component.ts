import { Component, HostListener } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgIf, NgOptimizedImage } from "@angular/common";
import { SearchComponent } from '../search/search.component';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { NgZone } from '@angular/core';

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
  loginIconPath = 'assets/icons/login-icon.svg';
  
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

  isLoggedIn = false;
  private authSubscription: Subscription;

  constructor(private authService: AuthService, private zone: NgZone) {
    this.authSubscription = this.authService.isLoggedIn.subscribe(status => {
      this.zone.run(() => { // Используйте NgZone для обновления UI
        this.isLoggedIn = status;
        console.log("Login status changed:", status);
      });
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
