import { Injectable, inject, PLATFORM_ID, signal, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private THEME_COOKIE = 'fresh-projects-theme';
  private _darkMode = signal(false);
  private _useSystemPreference = signal(true);

  constructor() {
    this.initialize();
    effect(() => {
      this.applyTheme(this._darkMode());
    });
  }

  get darkMode() {
    return this._darkMode();
  }

  private initialize(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = this.getCookie(this.THEME_COOKIE);

      if (storedTheme) {
        this._useSystemPreference.set(false);
        this._darkMode.set(storedTheme === 'dark');
      } else {
        this._useSystemPreference.set(true);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this._darkMode.set(prefersDark);

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          if (this._useSystemPreference()) {
            this._darkMode.set(e.matches);
          }
        });
      }

      this.applyTheme(this._darkMode());
    } else {
      // Server-side: try to get theme from cookie for SSR
      const serverTheme = this.getServerCookie();
      if (serverTheme) {
        this._darkMode.set(serverTheme === 'dark');
        this._useSystemPreference.set(false);
      }
      this.applyTheme(this._darkMode());
    }
  }

  toggleTheme(): void {
    this._useSystemPreference.set(false);
    this._darkMode.update(current => !current);
  }

  private applyTheme(isDark: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      // Save to cookie only if not using system preference
      if (!this._useSystemPreference()) {
        this.setCookie(this.THEME_COOKIE, isDark ? 'dark' : 'light', 365);
      } else {
        // Remove cookie if using system preference
        this.deleteCookie(this.THEME_COOKIE);
      }

      // Apply theme to document
      const htmlElement = document.documentElement;
      if (isDark) {
        htmlElement.classList.add('dark');
        htmlElement.style.colorScheme = 'dark';
      } else {
        htmlElement.classList.remove('dark');
        htmlElement.style.colorScheme = 'light';
      }
    } else {
      // Server-side rendering
      // This will be applied during SSR if cookie is available
      if (typeof document !== 'undefined') {
        const htmlElement = document.documentElement;
        if (isDark) {
          htmlElement.classList.add('dark');
          htmlElement.style.colorScheme = 'dark';
        } else {
          htmlElement.classList.remove('dark');
          htmlElement.style.colorScheme = 'light';
        }
      }
    }
  }

  private setCookie(name: string, value: string, days: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }
  }

  private getCookie(name: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  private deleteCookie(name: string): void {
    if (isPlatformBrowser(this.platformId)) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }
  }

  private getServerCookie(): string | null {
    // For SSR, you might need to inject the request and read cookies
    // This is a placeholder for server-side cookie reading
    // You would typically inject the request context or use a cookie service
    return null;
  }
}
