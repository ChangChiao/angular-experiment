import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'angular-experiment-virtualized-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './virtualized-list.component.html',
  styleUrl: './virtualized-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualizedListComponent implements OnInit {
  dataSource = new MatTableDataSource<{ name: string; age: number }>([]);
  displayedColumns: string[] = ['name', 'age'];

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
    this.dataSource.data = this.generateData();
  }
}
