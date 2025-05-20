import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private http: HttpClient) {}

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>('/api/v1/rooms');
  }

  getRoomsByPropertyId(propertyId: string): Observable<Room[]> {
    return this.http.get<Room[]>('/api/v1/rooms').pipe(
      map(rooms => rooms.filter(room => room.propertyId === propertyId))
    );
  }

  getRoom(id: string): Observable<Room> {
    return this.http.get<Room>(`/api/v1/rooms/${id}`);
  }
}
