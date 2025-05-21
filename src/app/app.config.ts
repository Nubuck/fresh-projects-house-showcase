import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { provideIcons } from '@ng-icons/core';
import {
  tablerHome,
  tablerBed,
  tablerBath,
  tablerMaximize,
  tablerBuildingCommunity,
  tablerMapPin,
  tablerPhone,
  tablerCalendarEvent,
  tablerChevronRight,
  tablerChevronLeft,
  tablerSun,
  tablerMoon,
  tablerMenu2,
  tablerCheck,
  tablerSearch,
  tablerInfoCircle,
  tablerMoodSad,
  tablerAlertCircle,
  tablerX,
  tablerZoomIn,
  tablerZoomOut,
  tablerChevronUp,
  tablerChevronDown,
  tablerEye,
  tablerCamera
} from '@ng-icons/tabler-icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFileRouter(),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor])
    ),
    provideClientHydration(),
    provideIcons({
      tablerHome,
      tablerBed,
      tablerBath,
      tablerMaximize,
      tablerBuildingCommunity,
      tablerMapPin,
      tablerPhone,
      tablerCalendarEvent,
      tablerChevronRight,
      tablerChevronLeft,
      tablerSun,
      tablerMoon,
      tablerMenu2,
      tablerCheck,
      tablerSearch,
      tablerInfoCircle,
      tablerMoodSad,
      tablerAlertCircle,
      tablerX,
      tablerZoomIn,
      tablerZoomOut,
      tablerChevronUp,
      tablerChevronDown,
      tablerEye,
      tablerCamera
    })
  ],
};
