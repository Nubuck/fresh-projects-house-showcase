import { Component } from '@angular/core';
import { LayoutComponent } from './components/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  template: `<app-layout></app-layout>`,
  styles: `
    :host {
      max-width: 1280px;
      margin: 0 auto;
      text-align: center;
    }
  `,
})
export class AppComponent {}
