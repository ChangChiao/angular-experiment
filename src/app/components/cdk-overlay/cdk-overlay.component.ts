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
