import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
export class VirtualizedListComponent implements OnInit {
  dataSource = new MatTableDataSource<Data>([]);
  displayedColumns: string[] = ['name', 'age'];
  flag = false;
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
    this.dataSource.data = this.data;
    // setTimeout(() => {
    //   this.flag = true;
    // }, 1000);
  }
}
