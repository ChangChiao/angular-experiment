import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SetupComponent } from 'src/app/components/setup.component';

@Component({
  selector: 'angular-experiment-index',
  standalone: true,
  imports: [CommonModule, SetupComponent],
  template: `<div>
    <angular-experiment-setup></angular-experiment-setup>
  </div>`,
  styleUrl: './index.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent {}
