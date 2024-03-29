import { Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'assistants',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./assistants/assistants.component').then(
        (m) => m.AssistantsComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
