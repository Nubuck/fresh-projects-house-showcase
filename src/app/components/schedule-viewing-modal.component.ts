// src/app/components/schedule-viewing-modal.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { BaseModalComponent } from './base-modal.component';
import { ContactService } from '../services/contact.service';
import { ViewingFormData } from '../models/contact.model';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-schedule-viewing-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseModalComponent, NgIcon],
  template: `
    <app-base-modal
      [isOpen]="isOpen"
      title="Schedule Property Viewing"
      (closed)="closeModal()"
    >
      <!-- Loading State -->
      <div *ngIf="loading()" class="flex justify-center items-center py-8">
        <div
          class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"
        ></div>
      </div>

      <!-- Success State -->
      <div *ngIf="submitted()" class="text-center py-8">
        <div
          class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4"
        >
          <ng-icon
            name="tablerCheck"
            class="h-6 w-6 text-green-600 dark:text-green-400"
          ></ng-icon>
        </div>
        <h3 class="text-lg font-medium text-dark-text dark:text-white mb-2">
          Viewing Scheduled!
        </h3>
        <p class="text-light-text dark:text-gray-300 mb-6">
          Your viewing request has been submitted. Our agent will contact you to
          confirm the appointment.
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
      <form
        *ngIf="!loading() && !submitted()"
        #viewingForm="ngForm"
        (ngSubmit)="onSubmit(viewingForm)"
      >
        <div class="space-y-4">
          <!-- Property Info -->
          <div class="bg-light-background dark:bg-gray-800 p-3 rounded-lg">
            <p class="text-sm text-light-text dark:text-gray-300">
              <strong>Property:</strong> {{ propertyTitle || propertyId }}
            </p>
          </div>

          <!-- Contact Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Name Field -->
            <div class="flex flex-col items-start justify-start">
              <label
                for="name"
                class="block text-sm font-medium text-dark-text dark:text-white mb-1"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                [(ngModel)]="formData.name"
                required
                #name="ngModel"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary bg-light-background dark:bg-gray-800 text-dark-text dark:text-white"
                placeholder="Enter your full name"
              />
              <div
                *ngIf="name.invalid && name.touched"
                class="text-red-500 text-sm mt-1"
              >
                Name is required
              </div>
            </div>

            <!-- Email Field -->
            <div class="flex flex-col items-start justify-start">
              <label
                for="email"
                class="block text-sm font-medium text-dark-text dark:text-white mb-1"
              >
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
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary bg-light-background dark:bg-gray-800 text-dark-text dark:text-white"
                placeholder="Enter your email"
              />
              <div
                *ngIf="email.invalid && email.touched"
                class="text-red-500 text-sm mt-1"
              >
                <span *ngIf="email.errors?.['required']"
                  >Email is required</span
                >
                <span *ngIf="email.errors?.['email']"
                  >Please enter a valid email address</span
                >
              </div>
            </div>
          </div>

          <!-- Phone Field -->
          <div class="flex flex-col items-start justify-start">
            <label
              for="phone"
              class="block text-sm font-medium text-dark-text dark:text-white mb-1"
            >
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              [(ngModel)]="formData.phone"
              required
              #phone="ngModel"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary bg-light-background dark:bg-gray-800 text-dark-text dark:text-white"
              placeholder="Enter your phone number"
            />
            <div
              *ngIf="phone.invalid && phone.touched"
              class="text-red-500 text-sm mt-1"
            >
              Phone number is required
            </div>
          </div>

          <!-- Viewing Type -->
          <div class="flex flex-col items-start justify-start">
            <label
              class="block text-sm font-medium text-dark-text dark:text-white mb-2"
            >
              Viewing Type *
            </label>
            <div class="grid grid-cols-2 gap-3">
              <label class="relative">
                <input
                  type="radio"
                  name="viewingType"
                  value="in-person"
                  [(ngModel)]="formData.viewingType"
                  required
                  class="sr-only"
                />
                <div
                  class="p-3 border rounded-lg cursor-pointer transition-colors duration-200 text-center flex flex-row items-center justify-center"
                  [class]="
                    formData.viewingType === 'in-person'
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary text-dark-text dark:text-white'
                  "
                >
                  <ng-icon
                    name="tablerHome"
                    class="text-xl mx-auto mb-1 "
                  ></ng-icon>
                  <span class="ml-2 text-sm font-medium ">In-Person</span>
                </div>
              </label>
              <label class="relative">
                <input
                  type="radio"
                  name="viewingType"
                  value="virtual"
                  [(ngModel)]="formData.viewingType"
                  required
                  class="sr-only"
                />
                <div
                  class="p-3 border rounded-lg cursor-pointer transition-colors duration-200 text-center flex flex-row items-center justify-center"
                  [class]="
                    formData.viewingType === 'virtual'
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary text-dark-text dark:text-white'
                  "
                >
                  <ng-icon
                    name="tablerCamera"
                    class="text-xl mx-auto mb-1"
                  ></ng-icon>
                  <span class="ml-2 text-sm font-medium ">Virtual Tour</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Date and Time -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Preferred Date -->
            <div class="flex flex-col items-start justify-start">
              <label
                for="preferredDate"
                class="block text-sm font-medium text-dark-text dark:text-white mb-1"
              >
                Preferred Date *
              </label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                [(ngModel)]="formData.preferredDate"
                required
                #date="ngModel"
                [min]="tomorrow"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary bg-light-background dark:bg-gray-800 text-dark-text dark:text-white"
              />
              <div
                *ngIf="date.invalid && date.touched"
                class="text-red-500 text-sm mt-1"
              >
                Please select a date
              </div>
            </div>

            <!-- Preferred Time -->
            <div class="flex flex-col items-start justify-start">
              <label
                for="preferredTime"
                class="block text-sm font-medium text-dark-text dark:text-white mb-1"
              >
                Preferred Time *
              </label>
              <select
                id="preferredTime"
                name="preferredTime"
                [(ngModel)]="formData.preferredTime"
                required
                #time="ngModel"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary bg-light-background dark:bg-gray-800 text-dark-text dark:text-white"
              >
                <option value="">Select time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
              </select>
              <div
                *ngIf="time.invalid && time.touched"
                class="text-red-500 text-sm mt-1"
              >
                Please select a time
              </div>
            </div>
          </div>

          <!-- Special Requests -->
          <div class="flex flex-col items-start justify-start">
            <label
              for="message"
              class="block text-sm font-medium text-dark-text dark:text-white mb-1"
            >
              Special Requests or Questions
            </label>
            <textarea
              id="message"
              name="message"
              rows="3"
              [(ngModel)]="formData.message"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary bg-light-background dark:bg-gray-800 text-dark-text dark:text-white resize-none"
              placeholder="Any specific areas you'd like to focus on or questions you have..."
            ></textarea>
          </div>
        </div>

        <!-- Error Message -->
        <div
          *ngIf="error()"
          class="mt-4 p-3 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <p class="text-red-700 dark:text-red-400 text-sm">{{ error() }}</p>
        </div>

        <!-- Form Actions -->
        <div
          class="flex space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <button
            type="button"
            class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors duration-200"
            (click)="closeModal()"
          >
            Cancel
          </button>
          <button
            type="submit"
            [disabled]="!viewingForm.valid"
            class="primary flex-1 bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Schedule Viewing
          </button>
        </div>
      </form>
    </app-base-modal>
  `,
})
export class ScheduleViewingModalComponent {
  @Input() isOpen: boolean = false;
  @Input() propertyId!: string;
  @Input() propertyTitle?: string;
  @Output() closed = new EventEmitter<void>();

  private contactService = inject(ContactService);

  loading = signal(false);
  submitted = signal(false);
  error = signal('');

  formData: ViewingFormData = {
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyId: '',
    preferredDate: '',
    preferredTime: '',
    viewingType: 'in-person',
  };

  get tomorrow(): string {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.formData.propertyId = this.propertyId;
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
      type: 'viewing' as const,
      propertyId: this.propertyId,
      preferredDate: this.formData.preferredDate,
      preferredTime: this.formData.preferredTime,
      viewingType: this.formData.viewingType,
    };

    this.contactService.submitContactRequest(contactRequest).subscribe({
      next: () => {
        this.loading.set(false);
        this.submitted.set(true);
        setTimeout(() => {
          this.resetForm();
        }, 2000);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set('Failed to schedule viewing. Please try again.');
        console.error('Viewing schedule error:', err);
      },
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
      message: '',
      propertyId: this.propertyId,
      preferredDate: '',
      preferredTime: '',
      viewingType: 'in-person',
    };
    this.loading.set(false);
    this.submitted.set(false);
    this.error.set('');
  }
}
