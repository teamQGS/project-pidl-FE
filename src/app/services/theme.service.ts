import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themeKey = 'theme';
  private readonly darkClass = 'dark';

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    const isDark = document.body.classList.contains(this.darkClass);
    if (isDark) {
      document.body.classList.remove(this.darkClass);
      localStorage.setItem(this.themeKey, 'light');
    } else {
      document.body.classList.add(this.darkClass);
      localStorage.setItem(this.themeKey, 'dark');
    }
  }

  loadTheme(): void {
    const theme = localStorage.getItem(this.themeKey);
    if (theme === 'dark') {
      document.body.classList.add(this.darkClass);
    } else {
      document.body.classList.remove(this.darkClass);
    }
  }

  isDarkMode(): boolean {
    return document.body.classList.contains(this.darkClass);
  }
}
