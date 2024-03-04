import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { map } from 'rxjs';
import { random } from 'src/app/utils';
import { ProductList, rowItem } from './model/table-form.model';

@Component({
  selector: 'angular-experiment-table-form',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './table-form.component.html',
  styleUrl: './table-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFormComponent implements OnInit {
  constructor(private http: HttpClient) {}
  displayedColumns: string[] = ['id', 'price', 'rating', 'hash'];
  tableDataSource = new MatTableDataSource<rowItem>();

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
