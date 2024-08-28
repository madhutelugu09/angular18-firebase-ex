import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private auth: Auth = inject(Auth);  // Inject Auth
  private router: Router = inject(Router);  // Inject Router

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      // You might want to validate the token here (e.g., check its expiry)
      return true;  // User is authenticated
    } else {
      this.router.navigate(['/login']);  // Redirect to login if not authenticated
      return false;
    }
  }
}
