import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { finalize, map } from 'rxjs';
import { Book } from './book.model';
import { BookService } from './book.service';

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
  withMethods((store, booksService = inject(BookService)) => ({
    updateBooks(param: Book[]): void {
      patchState(store, (state) => ({ books: param }));
    },
    getAllBooks() {
      patchState(store, { isLoading: true });
      booksService.$books
        .pipe(
          map((data) => data.todos),
          finalize(() => {
            patchState(store, { isLoading: false });
          })
        )
        .subscribe((d) => {
          patchState(store, { books: d });
        });
    },
  }))
);
