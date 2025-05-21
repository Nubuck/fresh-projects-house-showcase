import { Component, inject } from '@angular/core';
import { LayoutComponent } from './components/layout.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  template: `
    <app-layout></app-layout>
  `,
  styles: `
    :host {
      max-width: 1280px;
      margin: 0 auto;
      text-align: center;
    }
  `,
})
export class AppComponent {
  private themeService = inject(ThemeService);

  // Initialization is now handled entirely in ThemeService
  // No need to apply dark class here, as it's applied to document.documentElement
}
