// src/app/components/layout.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" class="flex items-center">
          <span class="text-xl font-medium text-primary">Fresh Projects</span>
          <span class="ml-2 text-xl font-medium text-dark-text">Spaces</span>
        </a>
        <nav class="hidden md:block">
          <ul class="flex space-x-8">
            <li><a href="/" class="text-light-text hover:text-primary transition">Home</a></li>
            <li><a href="#" class="text-light-text hover:text-primary transition">Listings</a></li>
            <li><a href="#" class="text-light-text hover:text-primary transition">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <!-- Footer -->
    <footer class="bg-dark-background text-white py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <a href="/" class="flex items-center">
              <span class="text-xl font-medium text-primary">Fresh Projects</span>
              <span class="ml-2 text-xl font-medium text-white">Spaces</span>
            </a>
          </div>
          <div class="text-center md:text-right">
            <p class="text-gray-400">&copy; 2025 Fresh Projects Spaces. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class LayoutComponent {}
