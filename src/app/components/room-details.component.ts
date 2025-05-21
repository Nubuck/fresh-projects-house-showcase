import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  signal,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from '../models/room.model';
import { RoomService } from '../services/room.service';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [CommonModule, NgIcon],
  template: `
    <!-- Loading State -->
    <div *ngIf="loading()" class="flex justify-center items-center py-16">
      <div
        class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"
      ></div>
    </div>
    <!-- Room Details Content -->
    <div *ngIf="!loading() && room()" class="w-full">
      <h3
        class="text-xl font-medium text-dark-text dark:text-white mb-4 flex items-center"
      >
        {{ room()?.name }}
      </h3>
      <p
        class="text-light-text dark:text-gray-300 mb-6 leading-relaxed text-left"
      >
        {{ room()?.description }}
      </p>
      <!-- Room Photos with Progressive Loading -->
      <div class="mb-8">
        <h4 class="text-lg font-medium text-dark-text dark:text-white mb-3">
          Room Photos
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            *ngFor="let photo of roomPhotos()"
            class="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden h-56 relative"
          >
            <!-- Low-res background image (loads instantly) -->
            <img
              *ngIf="photo.lowRes"
              [src]="photo.lowRes"
              [alt]="room()?.name"
              class="w-full h-full object-cover absolute inset-0 transition-opacity duration-300"
              [class.opacity-0]="photo.highResLoaded"
            />
            <!-- High-res image (lazy loaded) -->
            <img
              *ngIf="photo.highRes"
              [src]="photo.highRes"
              [alt]="room()?.name"
              class="w-full h-full object-cover absolute inset-0 transition-opacity duration-500"
              [class.opacity-100]="photo.highResLoaded"
              [class.opacity-0]="!photo.highResLoaded"
              (load)="onHighResImageLoaded(photo)"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <!-- Room Features -->
      <div
        *ngIf="room()?.features && (room()?.features)!.length > 0"
        class="bg-light-background dark:bg-gray-700 rounded-lg p-6"
      >
        <h4 class="text-lg font-medium text-dark-text dark:text-white mb-4">
          Features
        </h4>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
          <li
            *ngFor="let feature of room()?.features"
            class="flex text-left items-center"
          >
            <div
              class="flex-shrink-0 rounded-full p-2 mr-3 bg-primary/10 dark:bg-primary/20"
            >
              <ng-icon
                name="tablerCheck"
                class="text-primary  text-2xl"
              ></ng-icon>
            </div>
            <span class="text-light-text dark:text-gray-300 text-base">{{
              feature
            }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- Empty/Not Selected State -->
    <div
      *ngIf="!loading() && !room()"
      class="w-full text-center py-12 px-4 bg-light-background dark:bg-gray-700 rounded-lg"
    >
      <ng-icon
        name="tablerInfoCircle"
        class="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4"
      ></ng-icon>
      <p class="text-light-text dark:text-gray-300">
        Select a room from the floorplan to view details
      </p>
    </div>
  `,
})
export class RoomDetailsComponent implements OnChanges {
  @Input() roomId: string = '';
  room = signal<Room | null>(null);
  loading = signal<boolean>(false);
  roomPhotos = signal<
    { highRes: string; lowRes: string; highResLoaded: boolean }[]
  >([]);
  private roomService = inject(RoomService);
  private cdr = inject(ChangeDetectorRef);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['roomId'] && this.roomId) {
      this.loadRoomData(this.roomId);
    }
  }

  private loadRoomData(id: string): void {
    this.loading.set(true);
    this.roomService.getRoom(id).subscribe({
      next: (roomData) => {
        this.room.set(roomData);
        const photos = roomData.photos.map((photo) => ({
          highRes: photo,
          lowRes: photo,
          highResLoaded: false,
        }));
        this.roomPhotos.set(photos);
        this.loading.set(false);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading room data:', error);
        this.room.set(null);
        this.loading.set(false);
      },
    });
  }

  onHighResImageLoaded(photo: {
    highRes: string;
    lowRes: string;
    highResLoaded: boolean;
  }): void {
    photo.highResLoaded = true;
    this.cdr.detectChanges();
  }
}
