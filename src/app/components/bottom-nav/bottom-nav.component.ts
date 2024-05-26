import { Component, NgZone} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.css'
})
export class BottomNavComponent {
  // v1.0.0 icons
  cartIconPath = 'assets/icons/cart-icon.svg';
  customerIconPath = 'assets/icons/customer-icon.svg';
  loginIconPath = 'assets/icons/login-icon.svg';
  catalogIconPath = 'assets/icons/catalog-icon.svg';
  homeIconPath = 'assets/icons/home-icon.svg';

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
