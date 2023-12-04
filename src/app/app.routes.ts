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
];
