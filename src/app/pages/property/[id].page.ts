// src/app/pages/property/[id].page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PropertyService } from '../../services/property.service';
import { RoomService } from '../../services/room.service';
import { Property } from '../../models/property.model';
import { Room } from '../../models/room.model';
import { PropertyStatsComponent } from '../../components/property-stats.component';
import { FloorPlanComponent } from '../../components/floor-plan.component';
import { RoomDetailsComponent } from '../../components/room-details.component';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [
    CommonModule,
    PropertyStatsComponent,
    FloorPlanComponent,
    RoomDetailsComponent
  ],
  template: `
    <div class="container mx-auto px-4 py-8" *ngIf="property">
      <!-- Property Title & Price Section -->
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl md:text-4xl font-medium text-dark-text mb-2">{{ property.title }}</h1>
          <p class="text-light-text text-lg">{{ property.address }}</p>
        </div>
        <div class="mt-4 md:mt-0">
          <p class="text-primary text-2xl md:text-3xl font-medium">{{ property.price }}</p>
        </div>
      </div>

      <!-- Property Gallery (Simplified) -->
      <div class="mb-8">
        <div class="bg-gray-200 rounded-lg overflow-hidden h-64 md:h-96">
          <img [src]="property.thumbnail" [alt]="property.title" class="w-full h-full object-cover">
        </div>
      </div>

      <!-- Property Stats -->
      <app-property-stats [property]="property"></app-property-stats>

      <!-- Property Description -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-2xl font-medium text-dark-text mb-4">About this property</h2>
        <p class="text-light-text">{{ property.description }}</p>
      </div>

      <!-- Floorplan & Room Details Section -->
      <div class="flex flex-col md:flex-row gap-8 mb-12">
        <!-- Floorplan Column -->
        <div class="w-full md:w-1/2 bg-white rounded-lg shadow p-6">
          <app-floor-plan
            [rooms]="rooms"
            [activeRoom]="selectedRoomId"
            (roomSelected)="onRoomSelected($event)">
          </app-floor-plan>
        </div>

        <!-- Room Details Column -->
        <div class="w-full md:w-1/2 bg-white rounded-lg shadow p-6">
          <app-room-details [roomId]="selectedRoomId"></app-room-details>
        </div>
      </div>
    </div>
  `
})
export default class PropertyDetailPage implements OnInit {
  property?: Property;
  rooms: Room[] = [];
  selectedRoomId: string = '';

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    // Get property ID from route
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id') ?? '';
        return this.propertyService.getProperty(id);
      })
    ).subscribe(property => {
      this.property = property;
    });

    // Get all rooms
    this.roomService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
      if (rooms.length > 0) {
        this.selectedRoomId = rooms[0].id;
      }
    });
  }

  onRoomSelected(roomId: string): void {
    this.selectedRoomId = roomId;
  }
}
