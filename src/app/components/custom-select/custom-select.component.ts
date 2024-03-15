import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'angular-experiment-custom-select',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatSelectModule,
  ],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSelectComponent {}
