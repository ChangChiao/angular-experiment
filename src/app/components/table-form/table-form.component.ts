import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'angular-experiment-table-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-form.component.html',
  styleUrl: './table-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFormComponent {}
