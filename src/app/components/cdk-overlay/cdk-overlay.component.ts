import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'angular-experiment-cdk-overlay',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './cdk-overlay.component.html',
  styleUrl: './cdk-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      transition('void <=> *', animate(100)),
    ]),
  ],
  // animations: [
  //   trigger('fadeInOut', [
  //     transition(':enter', [
  //       style({ opacity: 0 }),
  //       animate('300ms', style({ opacity: 1 })),
  //     ]),
  //     transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
  //   ]),
  // ],
})
export class CdkOverlayComponent {
  isShow = signal(false);

  handleOpen() {
    this.isShow.set(this.isShow() ? false : true);
  }

  handleClose() {
    this.isShow.set(false);
    console.log('close');
  }
}
