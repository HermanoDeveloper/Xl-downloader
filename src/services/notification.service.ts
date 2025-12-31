
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notificationKey = 'app-notifications-enabled';
  
  notificationsEnabled = signal<boolean>(this.getInitialState());

  private getInitialState(): boolean {
    const storedState = localStorage.getItem(this.notificationKey);
    // Defaults to true if not set
    return storedState ? JSON.parse(storedState) : true;
  }

  toggleNotifications() {
    this.notificationsEnabled.update(enabled => {
      const newState = !enabled;
      localStorage.setItem(this.notificationKey, JSON.stringify(newState));
      return newState;
    });
  }
}
