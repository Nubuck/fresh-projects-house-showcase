// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/index.page'),
      },
      {
        path: 'property/:id',
        loadComponent: () => import('./pages/property/[id].page'),
      }
    ]
  }
];
