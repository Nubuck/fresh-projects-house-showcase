// src/app/components/generic-modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModalComponent } from './base-modal.component';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-generic-modal',
  standalone: true,
  imports: [CommonModule, BaseModalComponent, NgIcon],
  template: `
    <app-base-modal 
      [isOpen]="isOpen" 
      [title]="title"
      (closed)="closeModal()"
    >
      <div class="prose dark:prose-invert max-w-none">
        <div class="text-light-text dark:text-gray-300 leading-relaxed">
          {{ content }}
        </div>
        
        <!-- Additional content based on modal type -->
        <div *ngIf="title === 'About Us'" class="mt-6 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div class="bg-light-background dark:bg-gray-800 p-4 rounded-lg">
              <h4 class="font-medium text-dark-text dark:text-white mb-2">Our Mission</h4>
              <p class="text-light-text dark:text-gray-300">To revolutionize the property viewing experience through innovative technology and exceptional service.</p>
            </div>
            <div class="bg-light-background dark:bg-gray-800 p-4 rounded-lg">
              <h4 class="font-medium text-dark-text dark:text-white mb-2">Our Vision</h4>
              <p class="text-light-text dark:text-gray-300">To be the leading platform for interactive property showcases worldwide.</p>
            </div>
          </div>
        </div>
        
        <div *ngIf="title === 'Terms of Service'" class="mt-6 space-y-4 text-sm">
          <div class="space-y-3">
            <h4 class="font-medium text-dark-text dark:text-white">Key Terms:</h4>
            <ul class="list-disc list-inside space-y-2 text-light-text dark:text-gray-300">
              <li>All property information is provided by third-party agents and sellers</li>
              <li>Virtual tours and photos are for informational purposes only</li>
              <li>Property availability and pricing subject to change without notice</li>
              <li>Users must comply with viewing appointment schedules</li>
              <li>Fresh Projects Spaces acts as a platform facilitator only</li>
            </ul>
          </div>
        </div>
        
        <div *ngIf="title === 'Privacy Policy'" class="mt-6 space-y-4 text-sm">
          <div class="space-y-3">
            <h4 class="font-medium text-dark-text dark:text-white">Data We Collect:</h4>
            <ul class="list-disc list-inside space-y-2 text-light-text dark:text-gray-300">
              <li>Contact information (name, email, phone) when you submit forms</li>
              <li>Property preferences and search history</li>
              <li>Device information and usage analytics</li>
              <li>Cookies for improved user experience</li>
            </ul>
            <h4 class="font-medium text-dark-text dark:text-white mt-4">How We Use Your Data:</h4>
            <ul class="list-disc list-inside space-y-2 text-light-text dark:text-gray-300">
              <li>To facilitate property viewings and agent communications</li>
              <li>To improve our platform and services</li>
              <li>To send relevant property updates (with consent)</li>
              <li>To comply with legal requirements</li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Modal Actions -->
      <div class="flex justify-end mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          class="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          (click)="closeModal()"
        >
          Close
        </button>
      </div>
    </app-base-modal>
  `
})
export class GenericModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() content: string = '';
  @Output() closed = new EventEmitter<void>();

  closeModal() {
    this.closed.emit();
  }
}