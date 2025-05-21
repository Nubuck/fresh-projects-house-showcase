import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Property } from '../models/property.model';
import { CommonModule, NgClass } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [RouterLink, CommonModule, NgClass, NgIcon],
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-6">
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
                <h3 class="text-xl font-medium text-dark-text dark:text-white mb-1">{{ property.title }}</h3>
                <p class="text-light-text dark:text-gray-300 mb-2">{{ property.address }}</p>
              </div>
              <p class="text-primary font-medium text-xl md:text-right">{{ property.price }}</p>
            </div>
            <p class="text-light-text dark:text-gray-300 mb-4 line-clamp-3">
              {{ property.description }}
            </p>
          </div>
          <!-- Property Stats and CTA -->
          <div class="mt-auto">
            <div class="flex justify-between text-light-text dark:text-gray-300 text-sm mb-4">
              <div class="flex items-center">
                <div class="flex items-center bg-primary/10 dark:bg-primary/20 rounded-full p-1 mr-2">
                  <ng-icon name="tablerBed" class="text-primary text-lg"></ng-icon>
                </div>
                <span class="text-base font-medium">{{ property.stats.bedrooms }} Bed{{ property.stats.bedrooms !== 1 ? 's' : '' }}</span>
              </div>
              <div class="flex items-center">
                <div class="flex items-center bg-primary/10 dark:bg-primary/20 rounded-full p-1 mr-2">
                  <ng-icon name="tablerBath" class="text-primary text-lg"></ng-icon>
                </div>
                <span class="text-base font-medium">{{ property.stats.bathrooms }} Bath{{ property.stats.bathrooms !== 1 ? 's' : '' }}</span>
              </div>
              <div class="flex items-center">
                <div class="flex items-center bg-primary/10 dark:bg-primary/20 rounded-full p-1 mr-2">
                  <ng-icon name="tablerMaximize" class="text-primary text-lg"></ng-icon>
                </div>
                <span class="text-base font-medium">{{ property.stats.area }}</span>
              </div>
            </div>
            <a [routerLink]="['/property', property.id]"
               class="text-white px-4 py-2 rounded-lg inline-flex items-center transition-opacity duration-300" [ngClass]="{'bg-primary hover:bg-primary/90 dark:bg-primary/90 dark:hover:bg-primary': true}">
              <span>View Details</span>
              <ng-icon name="tablerChevronRight" class="ml-2 text-lg"></ng-icon>
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
