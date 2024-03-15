import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./placeholder-home-page/placeholder-home-page.component').then(
        (m) => m.PlaceholderHomePageComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
