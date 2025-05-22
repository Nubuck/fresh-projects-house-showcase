import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyCardComponent } from '../components/property-card.component';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property.model';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent, FormsModule, NgIcon],
  template: `
    <div class="bg-light-background dark:bg-gray-800 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h1
            class="text-4xl md:text-5xl font-medium text-dark-text dark:text-white mb-4"
          >
            Fresh Projects Spaces
          </h1>
          <p
            class="text-light-text dark:text-gray-300 text-xl max-w-3xl mx-auto"
          >
            Find your perfect home with our interactive property listings
          </p>
        </div>
        <!-- Search Box -->
        <div class="max-w-4xl mx-auto mb-12">
          <div
            class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 flex items-center"
          >
            <div class="relative flex-grow">
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (ngModelChange)="performSearch()"
                placeholder="Search properties by location, features..."
                class="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white dark:bg-gray-800 text-dark-text dark:text-white"
              />
              <ng-icon
                name="tablerSearch"
                class="h-5 w-5 text-gray-400 dark:text-gray-300 absolute left-3 top-1/2 transform -translate-y-1/2"
              ></ng-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4 py-12">
      <!-- Featured Properties Heading -->
      <div class="mb-8">
        <h2 class="text-3xl font-medium text-dark-text dark:text-white mb-2">
          Featured Properties
        </h2>
        <div class="w-20 h-1 bg-primary rounded-full"></div>
      </div>
      <!-- Loading State -->
      <div *ngIf="loading" class="flex justify-center items-center py-16">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
        ></div>
      </div>
      <!-- No Properties State -->
      <div
        *ngIf="!loading && filteredProperties().length === 0"
        class="text-center py-16"
      >
        <ng-icon
          name="tablerHome"
          class="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
        ></ng-icon>
        <p class="text-light-text dark:text-gray-300 text-lg">
          {{
            properties.length > 0
              ? 'No properties match your search criteria.'
              : 'No properties available at the moment.'
          }}
        </p>
        <button
          *ngIf="searchQuery && properties.length > 0"
          (click)="clearSearch()"
          class="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors duration-200"
        >
          Clear Search
        </button>
      </div>
      <!-- Properties List -->
      <div *ngIf="!loading && filteredProperties().length > 0">
        <app-property-card
          *ngFor="let property of filteredProperties()"
          [property]="property"
        ></app-property-card>
      </div>
    </div>
  `,
})
export default class HomePage implements OnInit {
  properties: Property[] = [];
  loading: boolean = true;
  searchQuery: string = '';
  private allProperties = signal<Property[]>([]);
  filteredProperties = signal<Property[]>([]);

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.propertyService.getProperties().subscribe({
      next: (properties) => {
        this.properties = properties;
        this.allProperties.set(properties);
        this.filteredProperties.set(properties);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading properties:', error);
        this.loading = false;
      },
    });
  }

  performSearch(): void {
    if (!this.searchQuery) {
      this.filteredProperties.set(this.allProperties());
      return;
    }

    const query = this.searchQuery.toLowerCase().trim();

    const filtered = this.allProperties().filter((property) => {
      return (
        property.title.toLowerCase().includes(query) ||
        property.address.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query) ||
        property.stats.type.toLowerCase().includes(query) ||
        `${property.stats.bedrooms} bedroom`.includes(query) ||
        `${property.stats.bathrooms} bathroom`.includes(query) ||
        property.stats.area.toLowerCase().includes(query) ||
        property.price.toLowerCase().includes(query)
      );
    });

    this.filteredProperties.set(filtered);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filteredProperties.set(this.allProperties());
  }
}
