import { Component, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PropertyService } from '../../services/property.service';
import { RoomService } from '../../services/room.service';
import { Property } from '../../models/property.model';
import { Room } from '../../models/room.model';
import { PropertyStatsComponent } from '../../components/property-stats.component';
import { FloorPlanComponent } from '../../components/floor-plan.component';
import { RoomDetailsComponent } from '../../components/room-details.component';
import { ContactModalComponent } from '../../components/contact-modal.component';
import { ScheduleViewingModalComponent } from '../../components/schedule-viewing-modal.component';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [
    CommonModule,
    PropertyStatsComponent,
    FloorPlanComponent,
    RoomDetailsComponent,
    ContactModalComponent,
    ScheduleViewingModalComponent,
    RouterLink,
    NgIcon
  ],
  template: `
    <!-- Loading State -->
    <div *ngIf="isLoading" class="flex justify-center items-center py-24">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
    </div>
    <!-- Property Detail Content -->
    <div *ngIf="!isLoading && property" class="bg-light-background dark:bg-gray-800 pb-16">
      <!-- Property Header -->
      <div class="bg-white dark:bg-gray-900 shadow-md py-8">
        <div class="container mx-auto px-4">
          <!-- Breadcrumbs -->
          <div class="flex items-center text-sm mb-4">
            <a routerLink="/" class="text-light-text dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Home</a>
            <ng-icon name="tablerChevronRight" class="h-4 w-4 mx-2 text-gray-400"></ng-icon>
            <span class="text-primary">{{ property.title }}</span>
          </div>
          <!-- Property Title & Price -->
          <div class="text-center mb-4">
            <h1 class="text-3xl md:text-4xl font-medium text-dark-text dark:text-white mb-2">{{ property.title }}</h1>
            <p class="text-light-text dark:text-gray-300 text-lg">{{ property.address }}</p>
            <p class="text-primary text-3xl md:text-4xl font-medium mt-4">{{ property.price }}</p>
          </div>
        </div>
      </div>
      <!-- Main Content -->
      <div class="container mx-auto px-4 -mt-6">
        <!-- Property Gallery -->
        <div class="mb-8 bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
          <div class="h-64 sm:h-80 md:h-96 lg:h-112 bg-gray-200 dark:bg-gray-800">
            <img [src]="property.thumbnail" [alt]="property.title" class="w-full h-full object-cover">
          </div>
        </div>
        <!-- Property Stats Card -->
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-medium text-dark-text dark:text-white mb-6">Property Overview</h2>
          <app-property-stats [property]="property"></app-property-stats>
          <!-- Property Description -->
          <div class="mt-8">
            <h3 class="text-xl font-medium text-dark-text dark:text-white mb-4">About this property</h3>
            <p class="text-light-text dark:text-gray-300 leading-relaxed">{{ property.description }}</p>
          </div>
        </div>
        <!-- Floorplan & Room Details Section -->
        <div *ngIf="!isLoading && rooms.length > 0" class="flex flex-col lg:flex-row gap-8 mb-12">
          <!-- Floorplan Column -->
          <div class="w-full lg:w-1/2 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <app-floor-plan
              [rooms]="rooms"
              [activeRoom]="selectedRoomId()"
              [floorplanImage]="property.floorplan.image"
              [orientation]="property.floorplan.orientation"
              (roomSelected)="onRoomSelected($event)">
            </app-floor-plan>
          </div>
          <!-- Room Details Column -->
          <div class="w-full lg:w-1/2 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <app-room-details [roomId]="selectedRoomId()"></app-room-details>
          </div>
        </div>
        <!-- Contact/CTA Section -->
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 text-center">
          <h2 class="text-2xl font-medium text-dark-text dark:text-white mb-4">Interested in this property?</h2>
          <p class="text-light-text dark:text-gray-300 max-w-2xl mx-auto mb-6">Schedule a viewing or get more information about this property by contacting our agents.</p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <button
              class="text-white px-6 py-3 rounded-lg flex items-center justify-center transition-opacity bg-primary hover:bg-primary/90 dark:bg-primary/90 dark:hover:bg-primary"
              (click)="openContactAgentModal()"
            >
              <ng-icon name="tablerPhone" class="mr-2 text-2xl"></ng-icon>
              Contact Agent
            </button>
            <button
              class="border border-primary text-primary dark:text-primary px-6 py-3 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors"
              (click)="openScheduleViewingModal()"
            >
              <ng-icon name="tablerCalendarEvent" class="mr-2 text-2xl"></ng-icon>
              Schedule Viewing
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Error State -->
    <div *ngIf="!isLoading && !property" class="container mx-auto px-4 py-24 text-center">
      <ng-icon name="tablerMoodSad" class="h-16 w-16 mx-auto text-gray-300 mb-4"></ng-icon>
      <h2 class="text-2xl font-medium text-dark-text dark:text-white mb-4">Property Not Found</h2>
      <p class="text-light-text dark:text-gray-300 mb-8">The property you're looking for doesn't exist or has been removed.</p>
      <a routerLink="/" class="text-white px-6 py-3 rounded-lg inline-flex items-center transition-opacity bg-primary hover:bg-primary/90 dark:bg-primary/90 dark:hover:bg-primary">
        <ng-icon name="tablerChevronLeft" class="mr-2"></ng-icon>
        Back to Home
      </a>
    </div>
    <!-- Contact Agent Modal -->
    <app-contact-modal
      [isOpen]="contactAgentModalOpen()"
      [contactType]="'agent'"
      [propertyId]="property?.id"
      [propertyTitle]="property?.title"
      (closed)="closeContactAgentModal()"
    ></app-contact-modal>
    <!-- Schedule Viewing Modal -->
    <app-schedule-viewing-modal
      [isOpen]="scheduleViewingModalOpen()"
      [propertyId]="property?.id || ''"
      [propertyTitle]="property?.title"
      (closed)="closeScheduleViewingModal()"
    ></app-schedule-viewing-modal>
  `
})
export default class PropertyDetailPage implements OnInit {
  property?: Property;
  rooms: Room[] = [];
  selectedRoomId = signal('');
  isLoading: boolean = true;

  // Private modal state signals
  private _contactAgentModalOpen = signal(false);
  private _scheduleViewingModalOpen = signal(false);

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

  openContactAgentModal(): void {
    this._contactAgentModalOpen.set(true);
  }

  closeContactAgentModal(): void {
    this._contactAgentModalOpen.set(false);
  }

  openScheduleViewingModal(): void {
    this._scheduleViewingModalOpen.set(true);
  }

  closeScheduleViewingModal(): void {
    this._scheduleViewingModalOpen.set(false);
  }

  // Public readonly properties for template access
  contactAgentModalOpen = this._contactAgentModalOpen.asReadonly();
  scheduleViewingModalOpen = this._scheduleViewingModalOpen.asReadonly();
}
