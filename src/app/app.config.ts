import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFirebaseApp(() => {
      console.log('Initializing Firebase App...');
      const app = initializeApp(environment.firebaseConfig);
      console.log('Firebase App initialized with name:', app.name);
      return app;
    }),
    provideAuth(() => {
      console.log('Initializing Firebase Auth...');
      const auth = getAuth();
      console.log('Firebase Auth initialized:', auth);
      return auth;
    }),
  ]
};
