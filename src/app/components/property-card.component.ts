import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Property } from '../models/property.model';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [RouterLink, CommonModule, NgClass],
  template: `
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-6">
      <div class="flex flex-col md:flex-row">
        <!-- Property Image -->
        <div class="md:w-2/5 h-64 md:h-auto relative">
          <img [src]="property.thumbnail" [alt]="property.title" class="w-full h-full object-cover">
          <div class="absolute top-4 right-4 bg-primary text-white px-2 py-1 rounded text-sm font-medium">
            For Sale
          </div>
        </div>

        <!-- Property Details -->
        <div class="md:w-3/5 p-6 flex flex-col justify-between">
          <div>
            <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 class="text-xl font-medium text-dark-text mb-1">{{ property.title }}</h3>
                <p class="text-light-text mb-2">{{ property.address }}</p>
              </div>
              <p class="text-primary font-medium text-xl md:text-right">{{ property.price }}</p>
            </div>

            <p class="text-light-text mb-4 line-clamp-3">
              {{ property.description }}
            </p>
          </div>

          <!-- Property Stats and CTA -->
          <div class="mt-auto">
            <div class="flex justify-between text-light-text text-sm mb-4">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>{{ property.stats.bedrooms }} Bed{{ property.stats.bedrooms !== 1 ? 's' : '' }}</span>
              </div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
                <span>{{ property.stats.bathrooms }} Bath{{ property.stats.bathrooms !== 1 ? 's' : '' }}</span>
              </div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span>{{ property.stats.area }}</span>
              </div>
            </div>

            <a [routerLink]="['/property', property.id]"
               class="text-white px-4 py-2 rounded-lg inline-flex items-center transition-opacity duration-300" [ngClass]="{'bg-primary hover:bg-primary/90': true}">
              <span>View Details</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PropertyCardComponent {
  @Input() property!: Property;
}
