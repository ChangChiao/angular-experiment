import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { debounceTime, map } from 'rxjs';
import { random } from 'src/app/utils';
import { ProductList, rowItem } from './model/table-form.model';

@Component({
  selector: 'angular-experiment-table-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './table-form.component.html',
  styleUrl: './table-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFormComponent implements OnInit, AfterViewInit {
  constructor(private http: HttpClient, private fb: FormBuilder) {}
  displayedColumns: string[] = ['select', 'id', 'price', 'rating', 'hash'];
  selection = new SelectionModel<rowItem>(true, []);
  tableDataSource = new MatTableDataSource<rowItem>();
  tableForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  get rowsControl() {
    return this.tableForm.get('rows') as FormArray;
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableDataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.tableDataSource.data.forEach((row) => this.selection.select(row));
  }

  handleChange(id: string) {
    console.log('id', id);
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
  onSubmit() {}

  ngOnInit(): void {
    this.tableForm = this.fb.group({
      rows: this.fb.array([]),
    });
    this.getApiData().subscribe((d: rowItem[]) => {
      this.tableDataSource.data = d;
      d.forEach((item) => {
        this.rowsControl.push(
          this.fb.group({
            hash: [
              item.hash,
              [Validators.required, Validators.min(1), Validators.max(999)],
            ],
          })
        );
      });
    });

    this.tableForm.valueChanges.pipe(debounceTime(700)).subscribe((value) => {
      console.log('value', value);
    });
  }
}
