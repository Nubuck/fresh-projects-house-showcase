import { Component, Input, Output, EventEmitter, signal, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

interface PhotoItem {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-photo-gallery-modal',
  standalone: true,
  imports: [CommonModule, NgIcon],
  template: `
    <!-- Full Screen Modal -->
    <div
      *ngIf="isOpen"
      class="fixed top-0 left-0 right-0 bottom-0 z-[60] bg-black/75 backdrop-blur-lg flex items-center justify-center overflow-hidden scrollbar-hide"
      [attr.aria-modal]="true"
      role="dialog"
      (click)="closeModal()"
    >
      <!-- Close Button -->
      <button
        type="button"
        class="absolute top-4 right-4 z-10 text-white hover:text-gray-300 p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
        (click)="closeModal()"
        [attr.aria-label]="'Close gallery'"
      >
        <ng-icon name="tablerX" class="h-8 w-8"></ng-icon>
      </button>

      <!-- Navigation Controls -->
      <button
        *ngIf="photos.length > 1"
        type="button"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
        (click)="previousPhoto(); $event.stopPropagation()"
        [attr.aria-label]="'Previous photo'"
      >
        <ng-icon name="tablerChevronLeft" class="h-8 w-8"></ng-icon>
      </button>

      <button
        *ngIf="photos.length > 1"
        type="button"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
        (click)="nextPhoto(); $event.stopPropagation()"
        [attr.aria-label]="'Next photo'"
      >
        <ng-icon name="tablerChevronRight" class="h-8 w-8"></ng-icon>
      </button>

      <!-- Zoom Controls -->
      <div class="absolute bottom-4 left-4 z-10 flex space-x-2">
        <button
          type="button"
          class="text-white hover:text-gray-300 p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
          (click)="zoomOut(); $event.stopPropagation()"
          [disabled]="zoomLevel() <= 1"
          [attr.aria-label]="'Zoom out'"
        >
          <ng-icon name="tablerZoomOut" class="h-6 w-6"></ng-icon>
        </button>
        <button
          type="button"
          class="text-white hover:text-gray-300 p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
          (click)="zoomIn(); $event.stopPropagation()"
          [disabled]="zoomLevel() >= 3"
          [attr.aria-label]="'Zoom in'"
        >
          <ng-icon name="tablerZoomIn" class="h-6 w-6"></ng-icon>
        </button>
        <button
          type="button"
          class="text-white hover:text-gray-300 p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
          (click)="resetZoom(); $event.stopPropagation()"
          [attr.aria-label]="'Reset zoom'"
        >
          <ng-icon name="tablerMaximize" class="h-6 w-6"></ng-icon>
        </button>
      </div>

      <!-- Photo Counter -->
      <div *ngIf="photos.length > 1" class="absolute bottom-4 right-4 z-10 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
        {{ currentPhotoIndex() + 1 }} / {{ photos.length }}
      </div>

      <!-- Main Photo Container -->
      <div
        class="relative max-w-[90vw] max-h-[90vh] overflow-hidden"
        (click)="$event.stopPropagation()"
      >
        <div
          class="overflow-auto max-w-full max-h-full scrollbar-hide"
          #photoContainer
          (wheel)="onWheel($event)"
          (mousedown)="startDrag($event)"
          (mousemove)="onDrag($event)"
          (mouseup)="endDrag()"
          (mouseleave)="endDrag()"
        >
          <img
            *ngIf="currentPhoto()"
            [src]="currentPhoto()!.src"
            [alt]="currentPhoto()!.alt"
            class="block transition-transform duration-300 cursor-grab active:cursor-grabbing select-none"
            [style.transform]="'scale(' + zoomLevel() + ') translate(' + panX() + 'px, ' + panY() + 'px)'"
            [style.transformOrigin]="'center center'"
            (load)="onImageLoad()"
            (dragstart)="$event.preventDefault()"
          />
        </div>
      </div>

      <!-- Thumbnail Strip -->
      <div *ngIf="photos.length > 1" class="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10">
        <div class="flex space-x-2 bg-black/50 rounded-lg p-2 backdrop-blur-sm">
          <button
            *ngFor="let photo of photos; let i = index"
            type="button"
            class="w-12 h-12 rounded overflow-hidden border-2 transition-colors duration-200"
            [class]="i === currentPhotoIndex() ? 'border-primary' : 'border-transparent hover:border-white/50'"
            (click)="goToPhoto(i); $event.stopPropagation()"
          >
            <img
              [src]="photo.src"
              [alt]="photo.alt"
              class="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </div>
  `
})
export class PhotoGalleryModalComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() photos: PhotoItem[] = [];
  @Input() initialIndex: number = 0;
  @Output() closed = new EventEmitter<void>();

  private platformId = inject(PLATFORM_ID);

  currentPhotoIndex = signal(0);
  zoomLevel = signal(1);
  panX = signal(0);
  panY = signal(0);
  isDragging = signal(false);
  dragStartX = 0;
  dragStartY = 0;
  dragStartPanX = 0;
  dragStartPanY = 0;

  ngOnInit() {
    this.currentPhotoIndex.set(this.initialIndex);
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('keydown', this.handleKeyPress);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('keydown', this.handleKeyPress);
    }
  }

  get currentPhoto(): () => PhotoItem | null {
    return () => this.photos[this.currentPhotoIndex()] || null;
  }

  private handleKeyPress = (event: KeyboardEvent) => {
    if (!this.isOpen) return;

    switch (event.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'ArrowLeft':
        this.previousPhoto();
        break;
      case 'ArrowRight':
        this.nextPhoto();
        break;
      case '+':
      case '=':
        this.zoomIn();
        break;
      case '-':
        this.zoomOut();
        break;
      case '0':
        this.resetZoom();
        break;
    }
  };

  closeModal() {
    this.resetZoom();
    this.currentPhotoIndex.set(this.initialIndex);
    this.closed.emit();
  }

  previousPhoto() {
    if (this.photos.length > 1) {
      const newIndex = this.currentPhotoIndex() > 0
        ? this.currentPhotoIndex() - 1
        : this.photos.length - 1;
      this.currentPhotoIndex.set(newIndex);
      this.resetZoom();
    }
  }

  nextPhoto() {
    if (this.photos.length > 1) {
      const newIndex = this.currentPhotoIndex() < this.photos.length - 1
        ? this.currentPhotoIndex() + 1
        : 0;
      this.currentPhotoIndex.set(newIndex);
      this.resetZoom();
    }
  }

  goToPhoto(index: number) {
    if (index >= 0 && index < this.photos.length) {
      this.currentPhotoIndex.set(index);
      this.resetZoom();
    }
  }

  zoomIn() {
    if (this.zoomLevel() < 3) {
      this.zoomLevel.update(level => Math.min(3, level + 0.25));
    }
  }

  zoomOut() {
    if (this.zoomLevel() > 1) {
      this.zoomLevel.update(level => Math.max(1, level - 0.25));
      if (this.zoomLevel() === 1) {
        this.panX.set(0);
        this.panY.set(0);
      }
    }
  }

  resetZoom() {
    this.zoomLevel.set(1);
    this.panX.set(0);
    this.panY.set(0);
  }

  onWheel(event: WheelEvent) {
    event.preventDefault();
    if (event.deltaY < 0) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }

  startDrag(event: MouseEvent) {
    if (this.zoomLevel() > 1) {
      this.isDragging.set(true);
      this.dragStartX = event.clientX;
      this.dragStartY = event.clientY;
      this.dragStartPanX = this.panX();
      this.dragStartPanY = this.panY();
      event.preventDefault();
    }
  }

  onDrag(event: MouseEvent) {
    if (this.isDragging() && this.zoomLevel() > 1) {
      const deltaX = event.clientX - this.dragStartX;
      const deltaY = event.clientY - this.dragStartY;
      this.panX.set(this.dragStartPanX + deltaX);
      this.panY.set(this.dragStartPanY + deltaY);
    }
  }

  endDrag() {
    this.isDragging.set(false);
  }

  onImageLoad() {
    // Image loaded
  }
}
