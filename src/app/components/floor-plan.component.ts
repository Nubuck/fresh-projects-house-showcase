import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  signal,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Room } from '../models/room.model';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-floor-plan',
  standalone: true,
  imports: [CommonModule, NgClass, NgIcon],
  template: `
    <div class="w-full">
      <h3 class="text-xl font-medium text-dark-text dark:text-white mb-4">
        Interactive Floorplan
      </h3>
      <div class="mb-6 px-4 py-3 bg-light-background dark:bg-gray-700 rounded-lg text-center">
        <p class="text-sm text-light-text dark:text-gray-300 mb-0 flex items-center justify-center">
          <ng-icon name="tablerInfoCircle" class="mr-2 text-primary"></ng-icon>
          Click on a room to view detailed information and photos
        </p>
      </div>
      <div
        [class.floorplan-horizontal]="orientation === 'horizontal'"
        [class.floorplan-vertical]="orientation === 'vertical'"
        class="floorplan-container w-full relative mx-auto rounded-lg overflow-hidden"
      >
        <!-- Floorplan Image -->
        <img
          [src]="floorplanImage"
          alt="Floorplan"
          class="w-full border border-gray-200 dark:border-gray-700 rounded-lg"
        />
        <!-- Clickable Room Areas with Integrated Labels -->
        <div
          *ngFor="let room of rooms"
          [style.left.%]="getPercentPosition(room.coordinates.x, true)"
          [style.top.%]="getPercentPosition(room.coordinates.y, false)"
          [style.width.%]="getPercentSize(room.coordinates.width, true)"
          [style.height.%]="getPercentSize(room.coordinates.height, false)"
          [ngClass]="{
            'bg-[#74BA43]/40': activeRoomSignal() === room.id,
            'border-[#74BA43]': activeRoomSignal() === room.id,
            'border-2': activeRoomSignal() === room.id,
            'bg-[#74BA43]/10': activeRoomSignal() !== room.id,
            'hover:bg-[#74BA43]/30': activeRoomSignal() !== room.id,
            'hover:border-[#74BA43]': activeRoomSignal() !== room.id,
            'border-[#74BA43]/30': activeRoomSignal() !== room.id,
            'hover:border-2': activeRoomSignal() !== room.id
          }"
          class="absolute cursor-pointer group p-1 transition-all duration-200 border rounded-md flex flex-col items-start justify-start z-10"
          (click)="selectRoom(room.id)"
        >
          <!-- Integrated Room Label -->
          <div
            class="px-2 py-1 opacity-0 group-hover:opacity-100 bg-white dark:bg-gray-800 rounded-full text-xs text-left flex-nowrap whitespace-nowrap font-medium shadow-sm select-none transition-colors duration-300 flex flex-row items-start justify-start text-dark-text dark:text-white"
            [ngClass]="{  'opacity-100':activeRoomSignal() === room.id, }"
          >
            {{ room.name }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .floorplan-container {
        max-width: 800px;
        margin: 0 auto;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      .floorplan-horizontal {
        max-width: 800px;
      }
      .floorplan-vertical {
        max-width: 500px;
      }
    `,
  ],
})
export class FloorPlanComponent implements OnChanges {
  @Input() rooms: Room[] = [];
  @Input() activeRoom: string = '';
  @Input() floorplanImage: string = '';
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Output() roomSelected = new EventEmitter<string>();
  activeRoomSignal = signal('');
  // Reference dimensions of the original floorplan images
  referenceWidth = 800;
  referenceHeight = 624;
  cdr = inject(ChangeDetectorRef);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orientation']) {
      this.referenceWidth = this.orientation === 'horizontal' ? 800 : 550;
      this.referenceHeight = this.orientation === 'horizontal' ? 624 : 800;
    }
    if (changes['activeRoom']) {
      this.activeRoomSignal.set(this.activeRoom);
    }
  }

  getPercentPosition(pixelValue: number, isHorizontal: boolean): number {
    const reference =
      this.orientation === 'horizontal'
        ? isHorizontal
          ? this.referenceWidth
          : this.referenceHeight
        : isHorizontal
        ? this.referenceWidth * 1.45
        : this.referenceHeight * 1.3;
    return (pixelValue / reference) * 100;
  }

  getPercentSize(pixelValue: number, isHorizontal: boolean): number {
    const reference =
      this.orientation === 'horizontal'
        ? isHorizontal
          ? this.referenceWidth
          : this.referenceHeight
        : isHorizontal
        ? this.referenceWidth * 1.45
        : this.referenceHeight * 1.5;
    return (pixelValue / reference) * 100;
  }

  selectRoom(roomId: string): void {
    this.activeRoomSignal.set(roomId);
    this.roomSelected.emit(roomId);
    this.cdr.detectChanges();
  }
}
