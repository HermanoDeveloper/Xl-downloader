
import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { View } from '../../app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class FooterComponent {
  currentView = input.required<View>();
  navigate = output<View>();

  onNavigate(view: View) {
    this.navigate.emit(view);
  }
}
