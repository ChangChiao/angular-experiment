import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from './book.model';

@Injectable()
export class BookService {
  #http = inject(HttpClient);
  $books = this.#http.get<ApiResponse>('https://dummyjson.com/todos');
}
