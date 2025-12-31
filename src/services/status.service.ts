
import { Injectable, signal } from '@angular/core';

export interface Status {
  id: number;
  user: string;
  avatarUrl: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private mockStatuses: Status[] = [
    { id: 1, user: 'Alice', avatarUrl: 'https://picsum.photos/seed/user1/40/40', type: 'image', url: 'https://picsum.photos/seed/status1/1080/1920', thumbnailUrl: 'https://picsum.photos/seed/status1/300/500' },
    { id: 2, user: 'Bob', avatarUrl: 'https://picsum.photos/seed/user2/40/40', type: 'image', url: 'https://picsum.photos/seed/status2/1080/1920', thumbnailUrl: 'https://picsum.photos/seed/status2/300/500' },
    { id: 3, user: 'Charlie', avatarUrl: 'https://picsum.photos/seed/user3/40/40', type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', thumbnailUrl: 'https://picsum.photos/seed/status3/300/500' },
    { id: 4, user: 'Diana', avatarUrl: 'https://picsum.photos/seed/user4/40/40', type: 'image', url: 'https://picsum.photos/seed/status4/1080/1920', thumbnailUrl: 'https://picsum.photos/seed/status4/300/500' },
    { id: 5, user: 'Eve', avatarUrl: 'https://picsum.photos/seed/user5/40/40', type: 'image', url: 'https://picsum.photos/seed/status5/1080/1920', thumbnailUrl: 'https://picsum.photos/seed/status5/300/500' },
    { id: 6, user: 'Frank', avatarUrl: 'https://picsum.photos/seed/user6/40/40', type: 'image', url: 'https://picsum.photos/seed/status6/1080/1920', thumbnailUrl: 'https://picsum.photos/seed/status6/300/500' },
    { id: 7, user: 'Grace', avatarUrl: 'https://picsum.photos/seed/user7/40/40', type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnailUrl: 'https://picsum.photos/seed/status7/300/500' },
    { id: 8, user: 'Heidi', avatarUrl: 'https://picsum.photos/seed/user8/40/40', type: 'image', url: 'https://picsum.photos/seed/status8/1080/1920', thumbnailUrl: 'https://picsum.photos/seed/status8/300/500' },
  ];

  statuses = signal<Status[]>(this.mockStatuses);

  getStatuses() {
    return this.statuses();
  }
}
