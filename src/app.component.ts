
import { Component, ChangeDetectionStrategy, inject, effect, signal, computed, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { StatusGridComponent } from './components/status-grid/status-grid.component';
import { ThemeService } from './services/theme.service';
import { SettingsComponent } from './components/settings/settings.component';
import { SavedStatusesComponent } from './components/saved-statuses/saved-statuses.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { WelcomeGuideComponent } from './components/welcome-guide/welcome-guide.component';

export type View = 'home' | 'saved' | 'settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, FooterComponent, StatusGridComponent, SettingsComponent, SavedStatusesComponent, SideMenuComponent, SplashScreenComponent, WelcomeGuideComponent],
})
export class AppComponent implements OnInit {
  private readonly welcomeGuideKey = 'app-has-seen-welcome-guide';
  themeService = inject(ThemeService);
  currentView = signal<View>('home');
  isSideMenuOpen = signal(false);
  isLoading = signal(true);
  showWelcomeGuide = signal(false);

  headerTitle = computed(() => {
    switch(this.currentView()) {
      case 'home': return 'XL Status Saver';
      case 'saved': return 'Status Salvos';
      case 'settings': return 'Configurações';
      default: return 'XL Status Saver';
    }
  });

  showBackArrow = computed(() => this.currentView() !== 'home');

  constructor() {
    // This effect will run whenever the theme changes and apply it to the document.
    effect(() => {
      const theme = this.themeService.theme();
      const isDark =
        theme === 'dark' ||
        (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading.set(false);
      this.checkWelcomeGuide();
    }, 2000);
  }

  private checkWelcomeGuide() {
    const hasSeenGuide = localStorage.getItem(this.welcomeGuideKey);
    if (!hasSeenGuide) {
      this.showWelcomeGuide.set(true);
    }
  }

  closeWelcomeGuide() {
    this.showWelcomeGuide.set(false);
    localStorage.setItem(this.welcomeGuideKey, 'true');
  }

  navigate(view: View) {
    this.currentView.set(view);
  }

  goHome() {
    this.currentView.set('home');
  }

  openSideMenu() {
    this.isSideMenuOpen.set(true);
  }

  closeSideMenu() {
    this.isSideMenuOpen.set(false);
  }
}
