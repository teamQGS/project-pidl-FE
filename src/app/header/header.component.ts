import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  cartPath = 'assets/images/shopping-cart.svg';
  logoPath = 'assets/logo/logo-sized.svg';
  userPath = 'assets/images/user.svg'

  protected readonly window = window;

}
