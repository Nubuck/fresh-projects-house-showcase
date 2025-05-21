// src/app/services/contact.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactRequest } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) {}

  submitContactRequest(contactData: Omit<ContactRequest, 'id' | 'timestamp'>): Observable<ContactRequest> {
    return this.http.post<ContactRequest>('/api/v1/contact', contactData);
  }

  getContactRequests(): Observable<ContactRequest[]> {
    return this.http.get<ContactRequest[]>('/api/v1/contact');
  }
}