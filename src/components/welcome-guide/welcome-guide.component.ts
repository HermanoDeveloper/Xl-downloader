
import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-guide',
  templateUrl: './welcome-guide.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class WelcomeGuideComponent {
  close = output<void>();

  onClose() {
    this.close.emit();
  }
}
