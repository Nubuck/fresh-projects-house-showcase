// src/app/components/room-details.component.ts
import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from '../models/room.model'
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="room" class="w-full">
      <h3 class="text-xl font-medium text-dark-text mb-2">{{ room.name }}</h3>
      <p class="text-light-text mb-4">{{ room.description }}</p>

      <!-- Room Photos -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div *ngFor="let photo of room.photos" class="bg-gray-200 rounded-lg overflow-hidden h-56">
          <img [src]="photo" [alt]="room.name" class="w-full h-full object-cover">
        </div>
      </div>

      <!-- Room Features -->
      <div>
        <h4 class="text-lg font-medium text-dark-text mb-2">Features</h4>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          <li *ngFor="let feature of room.features" class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-light-text">{{ feature }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div *ngIf="!room" class="w-full text-center py-8">
      <p class="text-light-text">Select a room from the floorplan to view details</p>
    </div>
  `
})
export class RoomDetailsComponent implements OnChanges {
  @Input() roomId: string = '';
  room?: Room;

  constructor(private roomService: RoomService) {}

  ngOnChanges(): void {
    if (this.roomId) {
      this.roomService.getRoom(this.roomId).subscribe(room => {
        this.room = room;
      });
    }
  }
}
