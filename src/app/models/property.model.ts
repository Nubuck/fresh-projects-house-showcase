// src/app/models/property.model.ts
export interface Property {
  id: string;
  title: string;
  address: string;
  price: string;
  thumbnail: string;
  description: string;
  stats: {
    bedrooms: number;
    bathrooms: number;
    area: string;
    type: string;
  };
}

