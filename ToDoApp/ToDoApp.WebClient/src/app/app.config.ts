import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { TokenInterceptor } from './token.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

const interceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    provideZoneChangeDetection({
      eventCoalescing: true
    }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([TokenInterceptor]))]
};