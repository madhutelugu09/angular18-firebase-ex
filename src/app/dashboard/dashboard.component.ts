import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
})
export class DashboardComponent {

  constructor(private auth: Auth, private router: Router) {}

  logout(): void {
    localStorage.removeItem('authToken');  // Clear the token from storage
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);  // Redirect to login
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  }
}
