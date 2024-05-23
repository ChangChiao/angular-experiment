import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

interface Data {
  name: string;
  age: number;
}

@Component({
  selector: 'angular-experiment-virtualized-list-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, ScrollingModule],
  templateUrl: './virtualized-list-table.component.html',
  styleUrl: './virtualized-list-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualizedListTableComponent implements OnInit {
  dataSource = new MatTableDataSource<Data>([]);
  displayedColumns: string[] = ['name', 'age'];
  data: Data[] = [];

  generateData() {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        name: `name-${i}`,
        age: i,
      });
    }
    return data;
  }

  ngOnInit() {
    this.data = this.generateData();
    this.dataSource.data = this.generateData();
    console.log('virtualized-list-table.component.ts');
  }
}
