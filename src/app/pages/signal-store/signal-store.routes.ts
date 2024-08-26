import { Route } from '@angular/router';
import { DataImportComponent } from './data-import.component';
import { BooksStore } from './signal-store.store';

export const DATA_PAGE_ROUTES: Route[] = [
  {
    path: '',
    component: DataImportComponent,
    providers: [BooksStore],
  },
];
