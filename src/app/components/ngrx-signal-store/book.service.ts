import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable()
export class BookService {
  #http = inject(HttpClient);
  $books = this.#http.get('https://dummyjson.com/todos/10');
}
