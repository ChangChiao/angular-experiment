import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

interface Data {
  name: string;
  age: number;
}

@Component({
  selector: 'angular-experiment-virtualized-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, ScrollingModule],
  templateUrl: './virtualized-list.component.html',
  styleUrl: './virtualized-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualizedListComponent {
  @Input() set people(data: Data[]) {
    this.dataSource.data = data;
  }
  @Output() personSelected = new EventEmitter<Data>();

  dataSource = new MatTableDataSource<Data>([]);
  displayedColumns: string[] = ['name', 'age'];
}
