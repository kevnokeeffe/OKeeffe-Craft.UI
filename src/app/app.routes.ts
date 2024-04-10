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
    path: 'verify-email',
    loadComponent: () =>
      import('./authentication/verify-email/verify-email.component').then(
        (m) => m.VerifyEmailComponent
      ),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./authentication/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent
      ),
  },
  {
    path: 'logout',
    loadComponent: () =>
      import('./authentication/logout/logout.component').then(
        (m) => m.LogoutComponent
      ),
  },
  {
    path: 'snake',
    loadComponent: () =>
      import('./games/snake/snake-container/snake-container.component').then(
        (m) => m.SnakeContainerComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
