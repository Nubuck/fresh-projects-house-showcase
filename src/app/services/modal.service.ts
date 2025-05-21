// src/app/services/modal.service.ts
import { Injectable, signal, computed } from '@angular/core';

export interface ModalData {
  id: string;
  title: string;
  content?: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _modals = signal<ModalData[]>([]);
  
  modals = computed(() => this._modals());
  
  openModal(modal: ModalData) {
    this._modals.update(modals => [...modals, modal]);
  }
  
  closeModal(id: string) {
    this._modals.update(modals => modals.filter(modal => modal.id !== id));
  }
  
  closeAllModals() {
    this._modals.set([]);
  }
  
  isModalOpen(id: string): boolean {
    return this._modals().some(modal => modal.id === id);
  }
  
  getModal(id: string): ModalData | undefined {
    return this._modals().find(modal => modal.id === id);
  }
}