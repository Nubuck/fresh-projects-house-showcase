import { Component, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
    NgClass,
    PropertyStatsComponent,
    FloorPlanComponent,
    RoomDetailsComponent,
    RouterLink
  ],
  template: `
    <!-- Loading State -->
    <div *ngIf="isLoading" class="flex justify-center items-center py-24">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
    </div>

    <!-- Property Detail Content -->
    <div *ngIf="!isLoading && property" class="bg-light-background pb-16">
      <!-- Property Header -->
      <div class="bg-white shadow-md py-8">
        <div class="container mx-auto px-4">
          <!-- Breadcrumbs -->
          <div class="flex items-center text-sm mb-4">
            <a routerLink="/" class="text-light-text hover:text-primary transition-colors">Home</a>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-primary">{{ property.title }}</span>
          </div>

          <!-- Property Title & Price -->
          <div class="text-center mb-4">
            <h1 class="text-3xl md:text-4xl font-medium text-dark-text mb-2">{{ property.title }}</h1>
            <p class="text-light-text text-lg">{{ property.address }}</p>
            <p class="text-primary text-3xl md:text-4xl font-medium mt-4">{{ property.price }}</p>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="container mx-auto px-4 -mt-6">
        <!-- Property Gallery -->
        <div class="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div class="h-64 sm:h-80 md:h-96 lg:h-112 bg-gray-200">
            <img [src]="property.thumbnail" [alt]="property.title" class="w-full h-full object-cover">
          </div>
        </div>

        <!-- Property Stats Card -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-medium text-dark-text mb-6">Property Overview</h2>
          <app-property-stats [property]="property"></app-property-stats>

          <!-- Property Description -->
          <div class="mt-8">
            <h3 class="text-xl font-medium text-dark-text mb-4">About this property</h3>
            <p class="text-light-text leading-relaxed">{{ property.description }}</p>
          </div>
        </div>

        <!-- Floorplan & Room Details Section -->
        <div *ngIf="!isLoading && rooms.length > 0" class="flex flex-col lg:flex-row gap-8 mb-12">
          <!-- Floorplan Column -->
          <div class="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6">
            <app-floor-plan
              [rooms]="rooms"
              [activeRoom]="selectedRoomId()"
              [floorplanImage]="property.floorplan.image"
              [orientation]="property.floorplan.orientation"
              (roomSelected)="onRoomSelected($event)">
            </app-floor-plan>
          </div>

          <!-- Room Details Column -->
          <div class="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6">
            <app-room-details [roomId]="selectedRoomId()"></app-room-details>
          </div>
        </div>

        <!-- Contact/CTA Section -->
        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 class="text-2xl font-medium text-dark-text mb-4">Interested in this property?</h2>
          <p class="text-light-text max-w-2xl mx-auto mb-6">Schedule a viewing or get more information about this property by contacting our agents.</p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <button class="text-white px-6 py-3 rounded-lg flex items-center justify-center transition-opacity" [ngClass]="{'bg-primary hover:bg-primary/90': true}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contact Agent
            </button>
            <button class="border border-primary text-primary px-6 py-3 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule Viewing
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div *ngIf="!isLoading && !property" class="container mx-auto px-4 py-24 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 class="text-2xl font-medium text-dark-text mb-4">Property Not Found</h2>
      <p class="text-light-text mb-8">The property you're looking for doesn't exist or has been removed.</p>
      <a routerLink="/" class="text-white px-6 py-3 rounded-lg inline-flex items-center transition-opacity" [ngClass]="{'bg-primary hover:bg-primary/90': true}">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </a>
    </div>
  `
})
export default class PropertyDetailPage implements OnInit {
  property?: Property;
  rooms: Room[] = [];
  selectedRoomId = signal('');
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private roomService: RoomService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPropertyData();
  }

  loadPropertyData(): void {
    this.isLoading = true;
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id') ?? '';
        return this.propertyService.getProperty(id);
      })
    ).subscribe({
      next: (property) => {
        this.property = property;
        // Once we have the property, load the rooms
        this.roomService.getRoomsByPropertyId(property.id).subscribe({
          next: (rooms) => {
            this.rooms = rooms;
            if (rooms.length > 0) {
              // Set the signal value
              this.selectedRoomId.set(rooms[0].id);
            }
            this.isLoading = false;
            // Ensure proper change detection
            this.cdr.detectChanges();
          },
          error: (error) => {
            console.error('Error loading rooms data:', error);
            this.isLoading = false;
          }
        });
      },
      error: (error) => {
        console.error('Error loading property data:', error);
        this.isLoading = false;
      }
    });
  }

  onRoomSelected(roomId: string): void {
    this.selectedRoomId.set(roomId);
    this.cdr.detectChanges();
  }
}
