
import { Component, ChangeDetectionStrategy, input, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class HeaderComponent {
  title = input.required<string>();
  showBackArrow = input<boolean>(false);
  back = output<void>();
  menuClick = output<void>();

  notificationService = inject(NotificationService);
  notificationsEnabled = this.notificationService.notificationsEnabled;

  goBack() {
    this.back.emit();
  }

  onMenuClick() {
    this.menuClick.emit();
  }
}
