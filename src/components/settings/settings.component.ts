
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Theme, ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class SettingsComponent {
  themeService = inject(ThemeService);
  currentTheme = this.themeService.theme;
  currentYear = new Date().getFullYear();

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }
}
