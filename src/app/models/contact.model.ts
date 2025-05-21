// src/app/models/contact.model.ts
export interface ContactRequest {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: 'general' | 'agent' | 'viewing';
  propertyId?: string;
  preferredDate?: string;
  preferredTime?: string;
  viewingType?: 'in-person' | 'virtual';
  timestamp?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ViewingFormData extends ContactFormData {
  propertyId: string;
  preferredDate: string;
  preferredTime: string;
  viewingType: 'in-person' | 'virtual';
}