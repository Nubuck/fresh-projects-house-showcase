import { Injectable, inject, PLATFORM_ID, signal, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private THEME_KEY = 'fresh-projects-theme';

  // Use signal to track the current theme state
  private _darkMode = signal(false);

  // Track if we're using system preference or user choice
  private _useSystemPreference = signal(true);

  constructor() {
    this.initialize();

    // Set up an effect to handle theme changes
    effect(() => {
      this.applyTheme(this._darkMode());
    });
  }

  // Publicly expose the theme state
  get darkMode() {
    return this._darkMode();
  }

  // Initialize the theme based on stored preference or system preference
  private initialize(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Check for stored theme preference
      const storedTheme = localStorage.getItem(this.THEME_KEY);

      if (storedTheme) {
        // User has a stored preference, use it
        this._useSystemPreference.set(false);
        this._darkMode.set(storedTheme === 'dark');
      } else {
        // Use system preference
        this._useSystemPreference.set(true);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this._darkMode.set(prefersDark);

        // Set up listener for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          if (this._useSystemPreference()) {
            this._darkMode.set(e.matches);
          }
        });
      }

      // Immediately apply the theme at startup
      this.applyTheme(this._darkMode());
    }
  }

  // Toggle between light and dark themes
  toggleTheme(): void {
    // When user toggles, we no longer use system preference
    this._useSystemPreference.set(false);
    this._darkMode.update(current => !current);

    // Effect will handle applying the theme
  }

  // Apply the theme to the document
  private applyTheme(isDark: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      // Save preference to localStorage if not using system preference
      if (!this._useSystemPreference()) {
        localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
      }

      // Apply class to document element (html tag)
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
    }
  }
}
