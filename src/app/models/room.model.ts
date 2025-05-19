// src/app/models/room.model.ts
export interface Room {
  id: string;
  name: string;
  description: string;
  features: string[];
  photos: string[];
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
