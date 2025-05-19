// src/app/pages/index.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyCardComponent } from '../components/property-card.component';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <header class="mb-8">
        <h1 class="text-3xl md:text-4xl font-medium text-dark-text mb-2">Fresh Projects Spaces</h1>
        <p class="text-light-text text-lg">Find your perfect home</p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <app-property-card *ngFor="let property of properties" [property]="property"></app-property-card>
      </div>
    </div>
  `
})
export default class HomePage implements OnInit {
  properties: Property[] = [];

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.propertyService.getProperties().subscribe(properties => {
      this.properties = properties;
    });
  }
}
