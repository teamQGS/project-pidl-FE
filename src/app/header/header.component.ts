import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  cartPath = 'assets/images/shopping-cart.svg';
  logoPath = 'assets/images/colorkit.svg';
  userPath = 'assets/images/user.svg'

}
