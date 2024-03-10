import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/component-store';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import { ApiResponse, Book } from './book.model';
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
    getAllBooksNormal() {
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
    getAllBooks: rxMethod<void>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          console.log('getAllBooks');
          return booksService.$books.pipe(
            tapResponse({
              next: (data: ApiResponse) =>
                patchState(store, { books: data.todos }),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
    // loadByQuery: rxMethod<string>(
    //   pipe(
    //     debounceTime(300),
    //     distinctUntilChanged(),
    //     tap(() => patchState(store, { isLoading: true })),
    //     switchMap((query) => {
    //       return booksService.getByQuery(query).pipe(
    //         tapResponse({
    //           next: (books) => patchState(store, { books }),
    //           error: console.error,
    //           finalize: () => patchState(store, { isLoading: false }),
    //         })
    //       );
    //     })
    //   )
    // ),
  }))
);
