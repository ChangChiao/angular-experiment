import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

type BooksState = {
  books: any[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: BooksState = {
  books: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const BooksStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    loadBooks() {
      patchState(store, { isLoading: true });
    },
  })),
  withHooks({
    onInit() {
      console.warn('BooksStore on init');
    },
    onDestroy() {
      console.warn('BooksStore on destroy');
    },
  })
);
