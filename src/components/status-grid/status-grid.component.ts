
import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { StatusService, Status } from '../../services/status.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../services/notification.service';
import { SavedStatusService } from '../../services/saved-status.service';

export type FilterType = 'all' | 'image' | 'video';

@Component({
  selector: 'app-status-grid',
  templateUrl: './status-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgOptimizedImage],
})
export class StatusGridComponent {
  private statusService = inject(StatusService);
  private http = inject(HttpClient);
  private notificationService = inject(NotificationService);
  private savedStatusService = inject(SavedStatusService);
  
  private statuses = this.statusService.statuses;
  selectedStatus = signal<Status | null>(null);
  notificationVisible = signal(false);
  activeFilter = signal<FilterType>('all');
  saveNotification = signal('');
  
  filteredStatuses = computed(() => {
    const statuses = this.statuses();
    const filter = this.activeFilter();

    if (filter === 'all') {
      return statuses;
    }
    return statuses.filter(status => status.type === filter);
  });

  isSharingSupported = computed(() => !!navigator.share);

  constructor() {
    if (this.notificationService.notificationsEnabled()) {
      setTimeout(() => {
        this.notificationVisible.set(true);
        setTimeout(() => this.notificationVisible.set(false), 5000);
      }, 3000);
    }
  }

  setFilter(filter: FilterType) {
    this.activeFilter.set(filter);
  }

  viewStatus(status: Status) {
    this.selectedStatus.set(status);
  }

  closeViewer() {
    this.selectedStatus.set(null);
  }

  isStatusSaved(statusId: number): boolean {
    return this.savedStatusService.isStatusSaved(statusId);
  }

  async shareStatus(status: Status, event: Event) {
    event.stopPropagation();
    if (this.isSharingSupported()) {
      try {
        await navigator.share({
          title: `Status from ${status.user}`,
          text: `Check out this status from ${status.user}!`,
          url: status.url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  }

  async downloadAndSaveStatus(status: Status, event: Event) {
    event.stopPropagation();

    const isAlreadySaved = this.isStatusSaved(status.id);
    if (isAlreadySaved) {
      this.showSaveNotification('O status já foi salvo.');
      return;
    }
    
    this.savedStatusService.saveStatus(status);
    this.showSaveNotification('Iniciando download...');

    try {
      const response = await fetch(status.url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      
      const fileExtension = status.type === 'image' ? 'jpg' : 'mp4';
      link.download = `status_${status.user}_${status.id}.${fileExtension}`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(link.href);

      this.showSaveNotification('Download concluído!');

    } catch (error) {
      console.error('Download failed:', error);
      this.showSaveNotification('Falha no download.');
      // Optionally remove from saved statuses if download fails
      // this.savedStatusService.removeStatus(status.id);
    }
  }

  private showSaveNotification(message: string) {
    this.saveNotification.set(message);
    setTimeout(() => {
      this.saveNotification.set('');
    }, 3000);
  }
}
