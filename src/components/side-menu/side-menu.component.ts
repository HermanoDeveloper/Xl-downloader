
import { Component, ChangeDetectionStrategy, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Theme, ThemeService } from '../../services/theme.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  imports: [CommonModule],
})
export class SideMenuComponent {
  close = output<void>();
  
  themeService = inject(ThemeService);
  notificationService = inject(NotificationService);
  
  currentTheme = this.themeService.theme;
  notificationsEnabled = this.notificationService.notificationsEnabled;
  currentYear = new Date().getFullYear();

  onClose() {
    this.close.emit();
  }

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }
  
  toggleNotifications() {
    this.notificationService.toggleNotifications();
  }
}
