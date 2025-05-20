export interface Room {
  id: string;
  propertyId: string;
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

// Optional enhanced model with support for low-res images
export interface RoomEnhanced {
  id: string;
  propertyId: string;
  name: string;
  description: string;
  features: string[];
  photos: {
    lowRes: string;
    highRes: string;
  }[];
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
