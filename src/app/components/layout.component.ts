import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div
        class="container mx-auto px-4 py-3 flex justify-between items-center"
      >
        <a routerLink="/" class="flex flex-row justify-start items-start">
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
          <span class="ml-2 text-xl font-medium text-dark-text">Spaces</span>
        </a>
        <nav class="hidden md:flex items-center">
          <ul class="flex space-x-8">
            <li>
              <a
                routerLink="/"
                routerLinkActive="text-primary font-medium"
                [routerLinkActiveOptions]="{ exact: true }"
                class="text-light-text hover:text-primary transition-colors duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                routerLink="/"
                class="text-light-text hover:text-primary transition-colors duration-200"
              >
                Listings
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-light-text hover:text-primary transition-colors duration-200"
              >
                Contact
              </a>
            </li>
          </ul>
          <div class="ml-8 space-x-4">
            <button
              class="px-4 py-2 border border-primary text-white rounded-md hover:bg-primary hover:text-white transition-colors duration-200"
            >
              Sign In
            </button>
            <button
              class="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-opacity duration-200"
            >
              Get Started
            </button>
          </div>
        </nav>
        <!-- Mobile menu button -->
        <button class="md:hidden flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
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
            <a href="#" class="text-gray-300 hover:text-white transition-colors"
              >About Us</a
            >
            <a href="#" class="text-gray-300 hover:text-white transition-colors"
              >Terms of Service</a
            >
            <a href="#" class="text-gray-300 hover:text-white transition-colors"
              >Privacy Policy</a
            >
            <a href="#" class="text-gray-300 hover:text-white transition-colors"
              >Contact</a
            >
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
  `,
})
export class LayoutComponent {}
