import { Component, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Property } from '../models/property.model';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-property-stats',
  standalone: true,
  imports: [CommonModule, NgClass, NgIcon],
  template: `
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div class="bg-light-background dark:bg-gray-700 rounded-lg p-5 text-center flex flex-col items-center">
        <div class="rounded-full p-3 mb-3" [ngClass]="{'bg-primary/10 dark:bg-primary/20': true}">
          <ng-icon name="tablerBuildingCommunity" class="text-primary text-6xl"></ng-icon>
        </div>
        <h3 class="text-dark-text dark:text-white font-medium mb-1">Property Type</h3>
        <p class="text-light-text dark:text-gray-300 text-lg font-medium">{{ property.stats.type }}</p>
      </div>
      <div class="bg-light-background dark:bg-gray-700 rounded-lg p-5 text-center flex flex-col items-center">
        <div class="rounded-full p-3 mb-3" [ngClass]="{'bg-primary/10 dark:bg-primary/20': true}">
          <ng-icon name="tablerBed" class="text-primary text-6xl"></ng-icon>
        </div>
        <h3 class="text-dark-text dark:text-white font-medium mb-1">Bedrooms</h3>
        <p class="text-light-text dark:text-gray-300 text-lg font-medium">{{ property.stats.bedrooms }}</p>
      </div>
      <div class="bg-light-background dark:bg-gray-700 rounded-lg p-5 text-center flex flex-col items-center">
        <div class="rounded-full p-3 mb-3" [ngClass]="{'bg-primary/10 dark:bg-primary/20': true}">
          <ng-icon name="tablerBath" class="text-primary text-6xl"></ng-icon>
        </div>
        <h3 class="text-dark-text dark:text-white font-medium mb-1">Bathrooms</h3>
        <p class="text-light-text dark:text-gray-300 text-lg font-medium">{{ property.stats.bathrooms }}</p>
      </div>
      <div class="bg-light-background dark:bg-gray-700 rounded-lg p-5 text-center flex flex-col items-center">
        <div class="rounded-full p-3 mb-3" [ngClass]="{'bg-primary/10 dark:bg-primary/20': true}">
          <ng-icon name="tablerMaximize" class="text-primary text-6xl"></ng-icon>
        </div>
        <h3 class="text-dark-text dark:text-white font-medium mb-1">Area</h3>
        <p class="text-light-text dark:text-gray-300 text-lg font-medium">{{ property.stats.area }}</p>
      </div>
    </div>
  `
})
export class PropertyStatsComponent {
  @Input() property!: Property;
}
