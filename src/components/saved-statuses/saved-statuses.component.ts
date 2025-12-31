
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { SavedStatusService } from '../../services/saved-status.service';
import { Status } from '../../services/status.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-saved-statuses',
  templateUrl: './saved-statuses.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgOptimizedImage]
})
export class SavedStatusesComponent {
  private savedStatusService = inject(SavedStatusService);

  savedStatuses = this.savedStatusService.savedStatuses;
  selectedStatus = signal<Status | null>(null);
  downloadNotification = signal('');

  isSharingSupported = !!navigator.share;

  removeStatus(statusId: number, event: Event) {
    event.stopPropagation();
    this.savedStatusService.removeStatus(statusId);
  }

  async shareStatus(status: Status, event: Event) {
    event.stopPropagation();
    if (!this.isSharingSupported) return;

    try {
      const response = await fetch(status.url);
      const blob = await response.blob();
      const file = new File([blob], `status.${status.type === 'image' ? 'jpg' : 'mp4'}`, { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Status from ${status.user}`,
          text: `Check out this status!`,
        });
      } else {
        await navigator.share({
          title: `Status from ${status.user}`,
          text: `Check out this status from ${status.user}!`,
          url: status.url,
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Error sharing status.');
    }
  }

  viewStatus(status: Status) {
    this.selectedStatus.set(status);
  }

  closeViewer() {
    this.selectedStatus.set(null);
  }

  async downloadStatus(status: Status, event: Event) {
    event.stopPropagation();
    this.showDownloadNotification('Iniciando download...');

    try {
      const response = await fetch(status.url);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      const fileExtension = status.type === 'image' ? 'jpg' : 'mp4';
      link.download = `status_${status.user}_${status.id}.${fileExtension}`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(link.href);
      this.showDownloadNotification('Download concluído!');
    } catch (error) {
      console.error('Download failed:', error);
      this.showDownloadNotification('Falha no download.');
    }
  }

  private showDownloadNotification(message: string) {
    this.downloadNotification.set(message);
    setTimeout(() => {
      this.downloadNotification.set('');
    }, 3000);
  }
}
