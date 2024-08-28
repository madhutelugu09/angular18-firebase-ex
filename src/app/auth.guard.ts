import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private auth: Auth = inject(Auth);  // Inject Auth
  private router: Router = inject(Router);  // Inject Router

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      console.log(" State URL : " + state.url );
      if ((state.url === '/login' || state.url === '/')) {
        this.router.navigate(['/dashboard']);
        return false;
      }
      // You might want to validate the token here (e.g., check its expiry)
      return true;  // User is authenticated
    } else {
      this.router.navigate(['/login']);  // Redirect to login if not authenticated
      return false;
    }
  }
}
