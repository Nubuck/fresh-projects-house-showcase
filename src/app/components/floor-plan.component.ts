// src/app/components/floor-plan.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from '../models/room.model';

@Component({
  selector: 'app-floor-plan',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full">
      <h3 class="text-xl font-medium text-dark-text mb-4">Interactive Floorplan</h3>
      <div class="floorplan-container w-full relative">
        <img src="/assets/images/floorplan.jpg" alt="Floorplan" class="w-full border border-gray-200 rounded-lg" useMap="#floorplan">
        <map name="floorplan">
          <area *ngFor="let room of rooms"
                [id]="room.id"
                [alt]="room.name"
                [title]="room.name"
                [attr.shape]="'rect'"
                [attr.coords]="room.coordinates.x + ',' + room.coordinates.y + ',' +
                              (room.coordinates.x + room.coordinates.width) + ',' +
                              (room.coordinates.y + room.coordinates.height)"
                (click)="selectRoom(room.id)"
                style="cursor:pointer;">
        </map>
        <div *ngFor="let room of rooms"
             [style.left.px]="room.coordinates.x + (room.coordinates.width / 2) - 50"
             [style.top.px]="room.coordinates.y + (room.coordinates.height / 2) - 10"
             [class.bg-primary]="activeRoom === room.id"
             [class.bg-opacity-70]="activeRoom === room.id"
             [class.bg-gray-500]="activeRoom !== room.id"
             [class.bg-opacity-50]="activeRoom !== room.id"
             class="absolute px-2 py-1 rounded text-white text-sm transition-colors duration-300 pointer-events-none">
          {{ room.name.split(' ')[0] }}
        </div>
      </div>
      <p class="text-sm text-light-text mt-4">Click on a room to view details</p>
    </div>
  `,
  styles: [`
    .floorplan-container {
      max-width: 800px;
      margin: 0 auto;
    }
  `]
})
export class FloorPlanComponent {
  @Input() rooms: Room[] = [];
  @Input() activeRoom: string = '';
  @Output() roomSelected = new EventEmitter<string>();

  selectRoom(roomId: string) {
    this.roomSelected.emit(roomId);
  }
}
