// src/app/components/property-card.component.ts
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Property } from '../models/property.model';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div class="h-48 bg-gray-200 relative">
        <img [src]="property.thumbnail" [alt]="property.title" class="w-full h-full object-cover">
        <div class="absolute top-4 right-4 bg-primary text-white px-2 py-1 rounded text-sm font-medium">
          For Sale
        </div>
      </div>
      <div class="p-4">
        <h3 class="text-lg font-medium text-dark-text mb-1">{{ property.title }}</h3>
        <p class="text-light-text mb-2">{{ property.address }}</p>
        <p class="text-primary font-medium mb-3">{{ property.price }}</p>
        <div class="flex justify-between text-light-text text-sm">
          <span>{{ property.stats.bedrooms }} Bed{{ property.stats.bedrooms !== 1 ? 's' : '' }}</span>
          <span>{{ property.stats.bathrooms }} Bath{{ property.stats.bathrooms !== 1 ? 's' : '' }}</span>
          <span>{{ property.stats.area }}</span>
        </div>
        <div class="mt-4">
          <a [routerLink]="['/property', property.id]" class="bg-primary text-white px-4 py-2 rounded-lg inline-block hover:opacity-90 transition-opacity duration-300">View Details</a>
        </div>
      </div>
    </div>
  `
})
export class PropertyCardComponent {
  @Input() property!: Property;
}
