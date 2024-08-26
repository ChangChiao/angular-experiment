import { Route } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [],
    data: {
      // Using array as configuration
      featureToggle: [
        // This configuration will check if feature toggle is enabled
        'enableSecondText',
        '!enableFirstText',
      ],
    },
  },
  {
    path: 'dynamic',
    loadChildren: () =>
      import('./pages/signal-store/signal-store.routes').then(
        (m) => m.DATA_PAGE_ROUTES
      ),
  },
  {
    path: 'fixed',
    loadChildren: () =>
      import('./pages/signal-store/signal-store.routes').then(
        (m) => m.DATA_PAGE_ROUTES
      ),
  },
];
