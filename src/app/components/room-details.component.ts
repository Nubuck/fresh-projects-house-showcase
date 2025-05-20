import { Component, Input, OnChanges, SimpleChanges, signal, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Room, RoomEnhanced } from '../models/room.model';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [CommonModule, NgClass],
  template: `
    <!-- Loading State -->
    <div *ngIf="loading()" class="flex justify-center items-center py-16">
      <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
    </div>

    <!-- Room Details Content -->
    <div *ngIf="!loading() && room()" class="w-full">
      <h3 class="text-xl font-medium text-dark-text mb-4 flex items-center">
        {{ room()?.name }}
        <span class="ml-2 px-2 py-1 text-primary text-xs rounded-full font-medium" [ngClass]="{'bg-primary/10': true}">
          Selected
        </span>
      </h3>

      <p class="text-light-text mb-6 leading-relaxed">{{ room()?.description }}</p>

      <!-- Room Photos with Progressive Loading -->
      <div class="mb-8">
        <h4 class="text-lg font-medium text-dark-text mb-3">Room Photos</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div *ngFor="let photo of roomPhotos()" class="bg-gray-100 rounded-lg overflow-hidden h-56 relative">
            <!-- Low-res background image (loads instantly) -->
            <img
              *ngIf="photo.lowRes"
              [src]="photo.lowRes"
              [alt]="room()?.name"
              class="w-full h-full object-cover absolute inset-0 transition-opacity duration-300"
              [class.opacity-0]="photo.highResLoaded"
            >

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
            >
          </div>
        </div>
      </div>

      <!-- Room Features -->
      <div *ngIf="room()?.features && room()?.features!.length > 0" class="bg-light-background rounded-lg p-6">
        <h4 class="text-lg font-medium text-dark-text mb-4">Features</h4>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
          <li *ngFor="let feature of room()?.features" class="flex items-start">
            <div class="flex-shrink-0 rounded-full p-1 mr-3" [ngClass]="{'bg-primary/10': true}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-light-text">{{ feature }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Empty/Not Selected State -->
    <div *ngIf="!loading() && !room()" class="w-full text-center py-12 px-4 bg-light-background rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
      <p class="text-light-text">Select a room from the floorplan to view details</p>
    </div>
  `
})
export class RoomDetailsComponent implements OnChanges {
  @Input() roomId: string = '';

  room = signal<Room | null>(null);
  loading = signal<boolean>(false);
  roomPhotos = signal<{ highRes: string; lowRes: string; highResLoaded: boolean }[]>([]);

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

        // Initialize room photos with high/low res pairs
        // For this demo, we're simulating the low/high res pair with the same URLs
        // In a real app, you would have actual low-res and high-res image pairs
        const photos = roomData.photos.map(photo => ({
          highRes: photo,
          lowRes: photo, // In a real app, this would be a different low-res URL
          highResLoaded: false
        }));

        this.roomPhotos.set(photos);
        this.loading.set(false);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading room data:', error);
        this.room.set(null);
        this.loading.set(false);
      }
    });
  }

  onHighResImageLoaded(photo: { highRes: string; lowRes: string; highResLoaded: boolean }): void {
    photo.highResLoaded = true;
    this.cdr.detectChanges();
  }
}
