import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  #subject$: WebSocketSubject<unknown> | null = null;
  initialize(url: string): Observable<any> {
    return new Observable((observer) => {
      try {
        this.#subject$ = webSocket({
          url,
          deserializer: (msg) => msg,
        }) as any;
        const subscription = this.#subject$?.asObservable().subscribe({
          next: (msg) => {
            console.log('message received: ' + msg);
            observer.next(msg);
          },
          error: (err) => {
            console.log('err', err);
            observer.error(err);
          },
          complete: () => {
            console.log('complete');
            observer.complete();
          },
        });

        return () => {
          subscription?.unsubscribe();
          this.#subject$?.complete();
        };
      } catch (error) {
        return observer.error(error);
      }
    });
  }

  sendMsg(msg: string) {
    this.#subject$?.next(msg);
  }

  closeWs() {
    console.log('closeWs!!!!!!!!');
    this.#subject$?.complete();
  }
}
