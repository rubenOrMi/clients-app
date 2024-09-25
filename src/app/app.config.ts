import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { IMAGE_CONFIG } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    // {provide: LOCALE_ID, useValue: 'es'},
    {provide: MAT_DATE_LOCALE, useValue: 'es-MX'}, 
    provideAnimationsAsync(),
    {
      provide: IMAGE_CONFIG,
      useValue:{
        disableImageSizeWarning: true, 
        disableImageLazyLoadWarning: true
      }
    }
  ],
  
};
