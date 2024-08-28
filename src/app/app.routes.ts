import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], title: 'Dashboard' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },  // Wildcard route for a 404 page
];
