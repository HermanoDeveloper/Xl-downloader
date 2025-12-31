
import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeKey = 'app-theme';
  
  // Initialize theme from localStorage or default to 'system'
  theme = signal<Theme>(this.getInitialTheme());

  private getInitialTheme(): Theme {
    const storedTheme = localStorage.getItem(this.themeKey);
    if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
      return storedTheme as Theme;
    }
    return 'system';
  }

  setTheme(newTheme: Theme) {
    this.theme.set(newTheme);
    localStorage.setItem(this.themeKey, newTheme);
  }
}
