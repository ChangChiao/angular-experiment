import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'angular-experiment-ngrx-signal-store',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngrx-signal-store.component.html',
  styleUrl: './ngrx-signal-store.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgrxSignalStoreComponent {}
