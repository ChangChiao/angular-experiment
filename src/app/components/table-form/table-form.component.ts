import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { map } from 'rxjs';
import { random } from 'src/app/utils';
import { ProductList, rowItem } from './model/table-form.model';

@Component({
  selector: 'angular-experiment-table-form',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './table-form.component.html',
  styleUrl: './table-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFormComponent implements OnInit, AfterViewInit {
  constructor(private http: HttpClient) {}
  displayedColumns: string[] = ['id', 'price', 'rating', 'hash'];
  tableDataSource = new MatTableDataSource<rowItem>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
  }

  getApiData() {
    console.log('getApiData');
    return this.http.get<ProductList>('https://dummyjson.com/products').pipe(
      map((d) => d.products),
      map((product) => {
        return product.map((d) => ({
          id: d.id,
          price: d.price,
          rating: d.rating,
          hash: random(1, 999),
        }));
      })
    );
  }

  ngOnInit(): void {
    this.getApiData().subscribe((d: rowItem[]) => {
      this.tableDataSource.data = d;
    });
  }
}
