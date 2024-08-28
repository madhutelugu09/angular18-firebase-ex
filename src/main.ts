import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

console.log('Starting application bootstrap...!!');

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    console.log('Application bootstrap process completed successfully.');
  })
  .catch(err => console.error('Error during application bootstrap:', err));

console.log('Application bootstrap process started.');
