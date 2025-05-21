// src/app/components/contact-modal.component.ts
import { Component, Input, Output, EventEmitter, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { BaseModalComponent } from './base-modal.component';
import { ContactService } from '../services/contact.service';
import { ContactFormData } from '../models/contact.model';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseModalComponent, NgIcon],
  template: `
    <app-base-modal 
      [isOpen]="isOpen" 
      [title]="modalTitle"
      (closed)="closeModal()"
    >
      <!-- Loading State -->
      <div *ngIf="loading()" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
      
      <!-- Success State -->
      <div *ngIf="submitted()" class="text-center py-8">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
          <ng-icon name="tablerCheck" class="h-6 w-6 text-green-600 dark:text-green-400"></ng-icon>
        </div>
        <h3 class="text-lg font-medium text-dark-text dark:text-white mb-2">Message Sent Successfully!</h3>
        <p class="text-light-text dark:text-gray-300 mb-6">
          Thank you for your inquiry. We'll get back to you within 24 hours.
        </p>
        <button
          type="button"
          class="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          (click)="closeModal()"
        >
          Close
        </button>
      </div>
      
      <!-- Form State -->
      <form *ngIf="!loading() && !submitted()" #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)">
        <div class="space-y-4">
          <!-- Name Field -->
          <div>
            <label for="name" class="block text-sm font-medium text-dark-text dark:text-white mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              [(ngModel)]="formData.name"
              required
              #name="ngModel"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
              placeholder="Enter your full name"
            >
            <div *ngIf="name.invalid && name.touched" class="text-red-500 text-sm mt-1">
              Name is required
            </div>
          </div>
          
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-dark-text dark:text-white mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="formData.email"
              required
              email
              #email="ngModel"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
              placeholder="Enter your email address"
            >
            <div *ngIf="email.invalid && email.touched" class="text-red-500 text-sm mt-1">
              <span *ngIf="email.errors?.['required']">Email is required</span>
              <span *ngIf="email.errors?.['email']">Please enter a valid email address</span>
            </div>
          </div>
          
          <!-- Phone Field -->
          <div>
            <label for="phone" class="block text-sm font-medium text-dark-text dark:text-white mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              [(ngModel)]="formData.phone"
              #phone="ngModel"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
              placeholder="Enter your phone number"
            >
          </div>
          
          <!-- Message Field -->
          <div>
            <label for="message" class="block text-sm font-medium text-dark-text dark:text-white mb-1">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              [(ngModel)]="formData.message"
              required
              #message="ngModel"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white resize-none"
              placeholder="How can we help you?"
            ></textarea>
            <div *ngIf="message.invalid && message.touched" class="text-red-500 text-sm mt-1">
              Message is required
            </div>
          </div>
          
          <!-- Property Info (if applicable) -->
          <div *ngIf="propertyId" class="bg-light-background dark:bg-gray-800 p-3 rounded-lg">
            <p class="text-sm text-light-text dark:text-gray-300">
              <strong>Property of Interest:</strong> {{ propertyTitle || propertyId }}
            </p>
          </div>
        </div>
        
        <!-- Error Message -->
        <div *ngIf="error()" class="mt-4 p-3 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg">
          <p class="text-red-700 dark:text-red-400 text-sm">{{ error() }}</p>
        </div>
        
        <!-- Form Actions -->
        <div class="flex space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            (click)="closeModal()"
          >
            Cancel
          </button>
          <button
            type="submit"
            [disabled]="!contactForm.valid"
            class="flex-1 bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            {{ contactType === 'agent' ? 'Contact Agent' : 'Send Message' }}
          </button>
        </div>
      </form>
    </app-base-modal>
  `
})
export class ContactModalComponent {
  @Input() isOpen: boolean = false;
  @Input() contactType: 'general' | 'agent' = 'general';
  @Input() propertyId?: string;
  @Input() propertyTitle?: string;
  @Output() closed = new EventEmitter<void>();

  private contactService = inject(ContactService);
  
  loading = signal(false);
  submitted = signal(false);
  error = signal('');

  formData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  get modalTitle(): string {
    return this.contactType === 'agent' ? 'Contact Property Agent' : 'Contact Us';
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    this.loading.set(true);
    this.error.set('');

    const contactRequest = {
      name: this.formData.name,
      email: this.formData.email,
      phone: this.formData.phone,
      message: this.formData.message,
      type: this.contactType,
      propertyId: this.propertyId
    };

    this.contactService.submitContactRequest(contactRequest).subscribe({
      next: () => {
        this.loading.set(false);
        this.submitted.set(true);
        // Reset form after a delay
        setTimeout(() => {
          this.resetForm();
        }, 2000);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set('Failed to send message. Please try again.');
        console.error('Contact form error:', err);
      }
    });
  }

  closeModal() {
    this.resetForm();
    this.closed.emit();
  }

  private resetForm() {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
    this.loading.set(false);
    this.submitted.set(false);
    this.error.set('');
  }
}