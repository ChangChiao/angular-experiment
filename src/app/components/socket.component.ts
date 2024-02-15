import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'angular-experiment-socket',
  standalone: true,
  imports: [CommonModule],
  template: `<p>socket works!</p>`,
  styles: ``,
})
export class SocketComponent {
  socket = io('http://localhost:3000');

  constructor() {
    this.socket.on('connect', () => {
      console.log('connected successful');
    });

    this.socket.on('error', (error) => {
      console.log('error---', error);
    });

    this.socket.on('disconnect', () => {
      console.log('disconnect', this.socket.connected);
    });
  }
}
