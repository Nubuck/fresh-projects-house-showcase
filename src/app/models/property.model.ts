export interface Property {
  id: string;
  title: string;
  address: string;
  price: string;
  description: string;
  thumbnail: string;
  stats: {
    bedrooms: number;
    bathrooms: number;
    area: string;
    type: string;
  };
  floorplan: {
    image: string;
    orientation: 'horizontal' | 'vertical';
  };
}

// Optional enhanced model with support for low-res images
export interface PropertyEnhanced {
  id: string;
  title: string;
  address: string;
  price: string;
  description: string;
  thumbnail: {
    lowRes: string;
    highRes: string;
  };
  stats: {
    bedrooms: number;
    bathrooms: number;
    area: string;
    type: string;
  };
  floorplan: {
    image: string;
    orientation: 'horizontal' | 'vertical';
  };
}
