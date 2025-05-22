// src/app/components/base-modal.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  imports: [CommonModule, NgIcon],
  template: `
    <!-- Modal Backdrop -->
    <div
      *ngIf="isOpen"
      class="fixed top-0 left-0 right-0 bottom-0 z-50 overflow-y-auto"
      [attr.aria-labelledby]="title"
      [attr.aria-modal]="true"
      role="dialog"
    >
      <!-- Backdrop -->
      <div
        class="fixed top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        (click)="closeModal()"
      ></div>

      <!-- Modal Content Container -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div
          class="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl transform transition-all duration-300 w-full max-w-md"
          [class.scale-100]="isOpen"
          [class.scale-95]="!isOpen"
          (click)="$event.stopPropagation()"
        >
          <!-- Modal Header -->
          <div
            class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
          >
            <h3 class="text-lg font-medium text-dark-text dark:text-white">
              {{ title }}
            </h3>
            <button
              type="button"
              class="h-8 w-8 flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200"
              (click)="closeModal()"
              [attr.aria-label]="'Close ' + title"
            >
              <ng-icon name="tablerX" class="h-6 w-6"></ng-icon>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class BaseModalComponent implements OnInit, OnDestroy {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Output() closed = new EventEmitter<void>();

  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Prevent body scroll when modal is open
      if (this.isOpen) {
        document.body.style.overflow = 'hidden';
      }

      // Listen for escape key
      document.addEventListener('keydown', this.handleEscapeKey);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', this.handleEscapeKey);
    }
  }

  private handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.isOpen) {
      this.closeModal();
    }
  };

  closeModal() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
    this.closed.emit();
  }
}
