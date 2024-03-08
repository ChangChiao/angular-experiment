import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Book } from './book.model';

type BooksState = {
  books: Book[];
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
  withComputed(({ books }) => ({
    booksCount: computed(() => books().length),
  })),
  withMethods((store) => ({
    updateBooks(param: Book[]): void {
      patchState(store, (state) => ({ books: param }));
    },
  }))
);
