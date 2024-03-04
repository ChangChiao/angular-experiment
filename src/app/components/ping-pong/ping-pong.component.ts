import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'angular-experiment-ping-pong',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ping-pong.component.html',
  styles: ``,
})
export class PingPongComponent implements OnInit {
  #wsService = inject(WebsocketService);
  ws$: null | Observable<any> = null;
  pingSubscription: null | Subscription = null;
  pingInterval$ = interval(3000);
  retryTimeId: undefined | ReturnType<typeof setTimeout> = undefined;
  timeoutId: undefined | ReturnType<typeof setTimeout> = undefined;
  timeoutDuration = 6000;

  createConnect() {
    this.ws$ = null;
    this.ws$ = this.#wsService.initialize('ws://localhost:8082');
    this.ws$.subscribe({
      next: (msg) => {
        console.log('msg', msg);
        if (msg.message === 'ping') {
          this.confirmTimeout();
        }
      },
      error: () => {
        console.log('error!!!!!!');
        // this.reConnect();
      },
      complete: () => {
        console.log('complete!!!');
        // this.reConnect();
      },
    });
    // this.pingSubscription = this.pingInterval$.subscribe(() => {
    //   this.#wsService.sendMsg('pong');
    // });
  }

  reConnect() {
    // this.pingSubscription?.unsubscribe();
    clearTimeout(this.retryTimeId);
    this.retryTimeId = setTimeout(() => {
      this.createConnect();
    }, 3000);
  }

  confirmTimeout() {
    // console.log('confirmTimeout');
    // clearTimeout(this.timeoutId);
    // this.timeoutId = setTimeout(() => {
    //   console.log('timeOut!!!!');
    //   this.#wsService.closeWs();
    // }, 6000);
  }

  ngOnInit() {
    this.createConnect();
  }
}
