import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';
import { NgIcon } from '@ng-icons/core';
import { ContactModalComponent } from './contact-modal.component';
import { GenericModalComponent } from './generic-modal.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    NgIcon,
    ContactModalComponent,
    GenericModalComponent,
  ],
  template: `
    <!-- Header -->
    <header class="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div
        class="container mx-auto px-4 py-3 flex justify-between items-center"
      >
        <a
          routerLink="/"
          class="flex flex-row justify-start items-start relative"
        >
          <svg
            width="150"
            height="42"
            viewBox="0 0 698 192"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              transform="matrix(1.333333, 0, 0, -1.333333, -53.881176, 793.701355)"
            >
              <g transform="matrix(1, 0, 0, 1, 0, 227.155548)">
                <g>
                  <path
                    d="m 0,0 c -24.707,2.223 -44.073,22.975 -44.073,48.26 0,26.768 21.7,48.468 48.468,48.468 25.286,0 46.039,-19.366 48.26,-44.073 h 14.637 c -2.258,32.778 -29.545,58.673 -62.897,58.673 -34.831,0 -63.067,-28.237 -63.067,-63.068 0,-33.352 25.895,-60.639 58.673,-62.897 z"
                    style="fill:#444443;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    transform="translate(106.5829,249.2926)"
                  />
                  <path
                    d="M 0,0 C -2.092,-23.259 -20.607,-41.774 -43.866,-43.866 V -58.503 C -12.541,-56.345 12.479,-31.325 14.637,0 Z"
                    style="fill:#79b935;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    transform="translate(159.2381,293.1588)"
                  />
                  <path
                    d="M 0,0 V 65.819 H 43.848 V 56.642 H 10.382 V 36.988 H 38.378 V 28.366 H 10.382 L 10.382,0 Z"
                    style="fill:#79b935;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    transform="translate(210.5292,284.8434)"
                  />
                  <path
                    d="m 0,0 h 18.17 c 1.482,0 2.828,0.324 4.033,0.972 1.205,0.65 2.238,1.545 3.105,2.69 0.865,1.143 1.544,2.456 2.039,3.939 0.494,1.484 0.742,3.059 0.742,4.729 0,1.668 -0.295,3.243 -0.881,4.727 -0.588,1.483 -1.359,2.78 -2.317,3.893 -0.958,1.112 -2.071,1.993 -3.337,2.643 -1.268,0.648 -2.582,0.973 -3.94,0.973 L 0,24.566 Z m -10.382,-32.075 v 65.819 h 28.645 c 2.966,0 5.7,-0.619 8.203,-1.855 2.504,-1.237 4.65,-2.859 6.443,-4.866 1.793,-2.009 3.198,-4.297 4.218,-6.86 1.02,-2.566 1.529,-5.178 1.529,-7.833 0,-2.226 -0.309,-4.358 -0.926,-6.397 C 37.112,3.893 36.246,2.007 35.134,0.278 34.021,-1.453 32.662,-2.953 31.056,-4.218 29.448,-5.486 27.687,-6.429 25.771,-7.046 L 41.253,-32.075 H 29.479 L 15.203,-9.179 H 0 v -22.896 z"
                    style="fill:#79b935;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    transform="translate(288.4901,316.9186)"
                  />
                  <path
                    d="M 0,0 V -9.177 H -45.146 V 56.642 H -0.835 V 47.465 H -34.764 V 28.739 H -5.377 V 20.117 H -34.764 V 0 Z"
                    style="fill:#79b935;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    transform="translate(398.4354,294.0202)"
                  />
                  <path
                    d="m 0,0 c -0.618,0.679 -1.515,1.405 -2.688,2.178 -1.173,0.772 -2.548,1.499 -4.125,2.179 -1.576,0.679 -3.307,1.236 -5.191,1.668 -1.887,0.432 -3.817,0.649 -5.795,0.649 -4.388,0 -7.617,-0.803 -9.686,-2.409 -2.073,-1.608 -3.106,-3.833 -3.106,-6.675 0,-1.608 0.323,-2.921 0.974,-3.941 0.649,-1.02 1.652,-1.916 3.013,-2.688 1.358,-0.773 3.058,-1.453 5.097,-2.039 2.04,-0.588 4.418,-1.221 7.14,-1.901 3.337,-0.804 6.348,-1.7 9.038,-2.688 2.687,-0.989 4.959,-2.194 6.813,-3.615 1.854,-1.423 3.291,-3.168 4.311,-5.238 1.018,-2.071 1.529,-4.589 1.529,-7.556 0,-3.337 -0.634,-6.21 -1.9,-8.62 -1.268,-2.412 -2.998,-4.374 -5.191,-5.887 -2.196,-1.516 -4.745,-2.628 -7.648,-3.338 -2.905,-0.709 -6.026,-1.066 -9.364,-1.066 -5.005,0 -9.842,0.756 -14.508,2.271 -4.666,1.513 -8.884,3.723 -12.653,6.629 l 4.727,8.899 c 0.802,-0.804 1.961,-1.701 3.477,-2.688 1.514,-0.989 3.275,-1.901 5.284,-2.736 2.007,-0.833 4.185,-1.544 6.535,-2.131 2.349,-0.589 4.79,-0.881 7.324,-0.881 4.078,0 7.231,0.71 9.455,2.133 2.226,1.421 3.338,3.523 3.338,6.303 0,1.669 -0.417,3.06 -1.252,4.172 -0.834,1.112 -2.025,2.086 -3.568,2.921 -1.546,0.833 -3.43,1.589 -5.655,2.271 -2.225,0.678 -4.76,1.39 -7.602,2.132 -3.277,0.864 -6.135,1.776 -8.575,2.734 -2.443,0.958 -4.466,2.117 -6.071,3.476 -1.609,1.359 -2.829,2.95 -3.664,4.774 -0.833,1.822 -1.251,4.033 -1.251,6.628 0,3.213 0.618,6.073 1.855,8.576 1.235,2.503 2.921,4.603 5.053,6.304 2.131,1.699 4.648,2.981 7.553,3.846 2.906,0.865 6.057,1.298 9.457,1.298 4.45,0 8.559,-0.711 12.33,-2.132 3.767,-1.422 7.076,-3.183 9.919,-5.285 z"
                    style="fill:#79b935;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    transform="translate(460.6376,335.1808)"
                  />
                  <path
                    d="m 0,0 v -65.819 h -10.477 v 29.016 H -43.663 V -65.819 H -54.045 V 0 h 10.382 v -27.533 h 33.186 V 0 Z"
                    style="fill:#79b935;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    transform="translate(546.2958,350.6623)"
                  />
                </g>
              </g>
            </g>
          </svg>
          <span
            class="ml-2 text-lg tracking-[0.4em] font-light text-dark-text dark:text-white absolute top-5 left-10"
            >Spaces</span
          >
        </a>
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center">
          <ul class="flex items-center space-x-8">
            <li>
              <a
                routerLink="/"
                routerLinkActive="text-primary font-medium"
                [routerLinkActiveOptions]="{ exact: true }"
                class="text-light-text dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                routerLink="/"
                class="text-light-text dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200"
              >
                Listings
              </a>
            </li>
            <li>
              <button
                (click)="openContactModal()"
                class="primary text-light-text dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200 bg-transparent border-none p-0"
              >
                Contact
              </button>
            </li>
          </ul>
          <!-- Improved Dark mode toggle -->
          <div class="ml-8 flex items-center">
            <button
              class="relative bg-gray-300 dark:bg-gray-600' inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none "
              (click)="toggleTheme()"
              [attr.aria-label]="
                isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'
              "
            >
              <!-- Toggle Circle with Icon -->
              <span
                class="flex h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 items-center justify-center"
                [class]="isDarkMode() ? 'translate-x-9' : 'translate-x-1'"
              >
                <!-- Sun Icon (visible in light mode) -->
                <ng-icon
                  name="tablerSun"
                  class="h-4 w-4 text-gray-900 transition-opacity duration-200"
                  [class.opacity-100]="!isDarkMode()"
                  [class.opacity-0]="isDarkMode()"
                ></ng-icon>
                <!-- Moon Icon (visible in dark mode) -->
                <ng-icon
                  name="tablerMoon"
                  class="h-4 w-4 text-gray-300  absolute transition-opacity duration-200"
                  [class.opacity-100]="isDarkMode()"
                  [class.opacity-0]="!isDarkMode()"
                ></ng-icon>
              </span>
              <!-- Background Icons -->
              <span
                class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between px-2 rounded-full"
              >
                <ng-icon
                  name="tablerSun"
                  class="h-4 w-4 text-gray-900 transition-opacity duration-200"
                  [class.opacity-100]="isDarkMode()"
                  [class.opacity-0]="!isDarkMode()"
                ></ng-icon>
                <ng-icon
                  name="tablerMoon"
                  class="h-4 w-4 text-gray-900 transition-opacity duration-200"
                  [class.opacity-100]="!isDarkMode()"
                  [class.opacity-0]="isDarkMode()"
                ></ng-icon>
              </span>
            </button>
          </div>
        </nav>
        <!-- Mobile menu button -->
        <button
          class="primary md:hidden flex items-center text-dark-text dark:text-white bg-transparent border-none p-2"
          (click)="toggleMobileMenu()"
        >
          <ng-icon name="tablerMenu2" class="h-6 w-6"></ng-icon>
        </button>
      </div>
      <!-- Mobile Navigation Menu -->
      <div
        *ngIf="isMobileMenuOpen()"
        class="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 px-4 shadow-md"
      >
        <ul class="space-y-4">
          <li>
            <a
              routerLink="/"
              routerLinkActive="text-primary font-medium"
              [routerLinkActiveOptions]="{ exact: true }"
              class="block text-light-text dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200"
              (click)="closeMobileMenu()"
            >
              Home
            </a>
          </li>
          <li>
            <a
              routerLink="/"
              class="block text-light-text dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200"
              (click)="closeMobileMenu()"
            >
              Listings
            </a>
          </li>
          <li class="flex flex-row justify-center">
            <button
              (click)="openContactModal(); closeMobileMenu()"
              class="primary block text-light-text dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200 bg-transparent border-none p-0 text-left"
            >
              Contact
            </button>
          </li>
          <li class="pt-2 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <span class="text-light-text dark:text-gray-300">Dark Mode</span>
              <!-- Mobile Dark Mode Toggle -->
               <button
              class="relative bg-gray-300 dark:bg-gray-600' inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none "
              (click)="toggleTheme()"
              [attr.aria-label]="
                isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'
              "
            >
              <!-- Toggle Circle with Icon -->
              <span
                class="flex h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 items-center justify-center"
                [class]="isDarkMode() ? 'translate-x-9' : 'translate-x-1'"
              >
                <!-- Sun Icon (visible in light mode) -->
                <ng-icon
                  name="tablerSun"
                  class="h-4 w-4 text-gray-900 transition-opacity duration-200"
                  [class.opacity-100]="!isDarkMode()"
                  [class.opacity-0]="isDarkMode()"
                ></ng-icon>
                <!-- Moon Icon (visible in dark mode) -->
                <ng-icon
                  name="tablerMoon"
                  class="h-4 w-4 text-gray-300  absolute transition-opacity duration-200"
                  [class.opacity-100]="isDarkMode()"
                  [class.opacity-0]="!isDarkMode()"
                ></ng-icon>
              </span>
              <!-- Background Icons -->
              <span
                class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between px-2 rounded-full"
              >
                <ng-icon
                  name="tablerSun"
                  class="h-4 w-4 text-gray-900 transition-opacity duration-200"
                  [class.opacity-100]="isDarkMode()"
                  [class.opacity-0]="!isDarkMode()"
                ></ng-icon>
                <ng-icon
                  name="tablerMoon"
                  class="h-4 w-4 text-gray-900 transition-opacity duration-200"
                  [class.opacity-100]="!isDarkMode()"
                  [class.opacity-0]="isDarkMode()"
                ></ng-icon>
              </span>
            </button>
            </div>
          </li>
        </ul>
      </div>
    </header>
    <main class="min-h-screen">
      <router-outlet></router-outlet>
    </main>
    <!-- Footer -->
    <footer class="bg-dark-background text-white py-8 mt-12">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex flex-col justify-start items-start mb-4 md:mb-0">
            <a href="/" class="flex items-center">
              <span class="text-xl font-medium text-primary"
                >Fresh Projects</span
              >
              <span class="ml-2 text-xl font-medium text-white">Spaces</span>
            </a>
            <span class="text-gray-200 mt-2">Find your perfect home</span>
          </div>
          <div
            class="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-8"
          >
            <div
              class="text-gray-300 hover:text-white transition-colors cursor-pointer "
              (click)="
                openGenericModal(
                  'About Us',
                  'Learn more about Fresh Projects Spaces and our mission to help you find the perfect home. We are a team of experienced real estate professionals dedicated to providing exceptional service.'
                )
              "
              class="text-gray-300 hover:text-white transition-colors bg-transparent border-none p-0"
            >
              About Us
            </div>
            <div
              class="text-gray-300 hover:text-white transition-colors cursor-pointer"
              (click)="
                openGenericModal(
                  'Terms of Service',
                  'Our terms of service will be displayed here. This includes all the legal information about using our platform, user responsibilities, and service limitations.'
                )
              "
              class="text-gray-300 hover:text-white transition-colors bg-transparent border-none p-0"
            >
              Terms of Service
            </div>
            <div
              class="text-gray-300 hover:text-white transition-colors cursor-pointer"
              (click)="
                openGenericModal(
                  'Privacy Policy',
                  'Our privacy policy details how we collect, use, and protect your personal information. We are committed to maintaining your privacy and data security.'
                )
              "
              class="text-gray-300 hover:text-white transition-colors bg-transparent border-none p-0"
            >
              Privacy Policy
            </div>
            <div
              class="text-gray-300 hover:text-white transition-colors cursor-pointer"
              (click)="openContactModal()"
              class="text-gray-300 hover:text-white transition-colors bg-transparent border-none p-0"
            >
              Contact
            </div>
          </div>
        </div>
        <div
          class="mt-8 pt-8 border-t border-gray-800 text-center md:text-right"
        >
          <span class="text-gray-400">
            &copy; 2025 Fresh Projects Spaces. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
    <!-- Contact Modal -->
    <app-contact-modal
      [isOpen]="contactModalOpen()"
      [contactType]="contactModalType()"
      (closed)="closeContactModal()"
    ></app-contact-modal>
    <!-- Generic Modal -->
    <app-generic-modal
      [isOpen]="genericModalOpen()"
      [title]="genericModalTitle()"
      [content]="genericModalContent()"
      (closed)="closeGenericModal()"
    ></app-generic-modal>
  `,
})
export class LayoutComponent implements OnInit {
  private _mobileMenuOpen = signal(false);
  private themeService = inject(ThemeService);
  private _contactModalOpen = signal(false);
  private _contactModalType = signal<'general' | 'agent'>('general');
  private _genericModalOpen = signal(false);
  private _genericModalTitle = signal('');
  private _genericModalContent = signal('');

  ngOnInit() {}

  isDarkMode() {
    return this.themeService.darkMode;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isMobileMenuOpen() {
    return this._mobileMenuOpen();
  }

  toggleMobileMenu() {
    this._mobileMenuOpen.update((value) => !value);
  }

  closeMobileMenu() {
    this._mobileMenuOpen.set(false);
  }

  // Contact Modal Methods
  openContactModal(type: 'general' | 'agent' = 'general') {
    this._contactModalType.set(type);
    this._contactModalOpen.set(true);
  }

  closeContactModal() {
    this._contactModalOpen.set(false);
  }

  openGenericModal(title: string, content: string) {
    this._genericModalTitle.set(title);
    this._genericModalContent.set(content);
    this._genericModalOpen.set(true);
  }

  closeGenericModal() {
    this._genericModalOpen.set(false);
  }

  // Public readonly properties for template access
  contactModalOpen = this._contactModalOpen.asReadonly();
  contactModalType = this._contactModalType.asReadonly();
  genericModalOpen = this._genericModalOpen.asReadonly();
  genericModalTitle = this._genericModalTitle.asReadonly();
  genericModalContent = this._genericModalContent.asReadonly();
}
