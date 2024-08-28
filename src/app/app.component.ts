import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  // Reference to the external HTML file
  standalone: true,
  imports: [RouterModule]
})
export class AppComponent {}
