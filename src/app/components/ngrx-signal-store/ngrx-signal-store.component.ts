import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
  inject,
} from '@angular/core';
import { getState } from '@ngrx/signals';
import { BookService } from './book.service';
import { BooksStore } from './books.store';

@Component({
  selector: 'angular-experiment-ngrx-signal-store',
  standalone: true,
  imports: [CommonModule],
  providers: [BooksStore, BookService],
  templateUrl: './ngrx-signal-store.component.html',
  styleUrl: './ngrx-signal-store.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgrxSignalStoreComponent implements OnInit {
  readonly store = inject(BooksStore);

  constructor() {
    effect(() => {
      // 👇 The effect will be re-executed whenever the state changes.
      const state = getState(this.store);
      console.log('books state changed', state);
    });
  }

  ngOnInit(): void {
    this.store.getAllBooks();
  }
}
