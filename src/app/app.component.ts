import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {AngularToastifyModule} from "angular-toastify";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {HeaderComponent} from "./header/header.component";
import { FooterComponent } from './footer/footer.component';
import {FormsModule} from "@angular/forms";
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import {MatSnackBar} from "@angular/material/snack-bar";
import { ThemeService } from './services/theme.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule ,AngularToastifyModule, MatButtonToggleGroup, MatButtonToggle, HeaderComponent, FooterComponent, BottomNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Project Pidl';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.loadTheme();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
