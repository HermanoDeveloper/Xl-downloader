
import { Injectable, signal } from '@angular/core';
import { Status } from './status.service';

@Injectable({
  providedIn: 'root',
})
export class SavedStatusService {
  private readonly storageKey = 'app-saved-statuses';
  
  savedStatuses = signal<Status[]>(this.getInitialState());

  private getInitialState(): Status[] {
    const storedState = localStorage.getItem(this.storageKey);
    return storedState ? JSON.parse(storedState) : [];
  }

  private persistState() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.savedStatuses()));
  }

  isStatusSaved(statusId: number): boolean {
    return this.savedStatuses().some(s => s.id === statusId);
  }

  saveStatus(status: Status): boolean {
    if (this.isStatusSaved(status.id)) {
      return false; // Already saved
    }
    this.savedStatuses.update(statuses => [...statuses, status]);
    this.persistState();
    return true; // Successfully saved
  }

  removeStatus(statusId: number) {
    this.savedStatuses.update(statuses => statuses.filter(s => s.id !== statusId));
    this.persistState();
  }
}
