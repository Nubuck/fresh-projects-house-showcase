import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { PropertyCardComponent } from '../components/property-card.component';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgClass, PropertyCardComponent],
  template: `
    <div class="bg-light-background py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-medium text-dark-text mb-4">Fresh Projects Spaces</h1>
          <p class="text-light-text text-xl max-w-3xl mx-auto">Find your perfect home with our interactive property listings</p>
        </div>

        <!-- Search Box (Optional) -->
        <div class="max-w-4xl mx-auto mb-12">
          <div class="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div class="relative flex-grow">
              <input
                type="text"
                placeholder="Search properties by location, features..."
                class="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button class="ml-4 text-white px-6 py-3 rounded-md transition-opacity duration-200" [ngClass]="{'bg-primary hover:bg-primary/90': true}">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <!-- Featured Properties Heading -->
      <div class="mb-8">
        <h2 class="text-3xl font-medium text-dark-text mb-2">Featured Properties</h2>
        <div class="w-20 h-1 bg-primary rounded-full"></div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="flex justify-center items-center py-16">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>

      <!-- No Properties State -->
      <div *ngIf="!loading && properties.length === 0" class="text-center py-16">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <p class="text-light-text text-lg">No properties available at the moment.</p>
      </div>

      <!-- Properties List -->
      <div *ngIf="!loading && properties.length > 0">
        <app-property-card *ngFor="let property of properties" [property]="property"></app-property-card>
      </div>
    </div>
  `
})
export default class HomePage implements OnInit {
  properties: Property[] = [];
  loading: boolean = true;

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.propertyService.getProperties().subscribe({
      next: (properties) => {
        this.properties = properties;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading properties:', error);
        this.loading = false;
      }
    });
  }
}
