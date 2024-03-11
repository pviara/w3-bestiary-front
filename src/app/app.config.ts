import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        // // provideClientHydration(),
        provideHttpClient(withFetch()),
        provideRouter(routes),
        // // provideServiceWorker('ngsw-worker.js', {
        // //     enabled: !isDevMode(),
        // //     registrationStrategy: 'registerWhenStable:30000',
        // // }),
    ],
};
