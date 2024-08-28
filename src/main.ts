import { bootstrapApplication } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { routes } from './app/app.routes';

console.log('Starting application bootstrap...');

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
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
  ],
}).then(() => {
  console.log('Application bootstrap process completed successfully.');
}).catch(err => console.error('Error during application bootstrap:', err));

console.log('Application bootstrap process started.');
