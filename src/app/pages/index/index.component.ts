import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CdkOverlayComponent } from 'src/app/components/cdk-overlay/cdk-overlay.component';
import { CustomSelectComponent } from 'src/app/components/custom-select/custom-select.component';
import { DataImportComponent } from 'src/app/components/data-import/data-import.component';
import { DraggableComponent } from 'src/app/components/draggable/draggable.component';
import { DynamicFormComponent } from 'src/app/components/dynamic-form/dynamic-form.component';
import { NgrxSignalStoreComponent } from 'src/app/components/ngrx-signal-store/ngrx-signal-store.component';
import { PingPongComponent } from 'src/app/components/ping-pong/ping-pong.component';
import { SetupComponent } from 'src/app/components/setup/setup.component';
import { SocketComponent } from 'src/app/components/socket.component';
import { TableFormComponent } from 'src/app/components/table-form/table-form.component';
import { VirtualizedListTableComponent } from 'src/app/components/virtualized-list-table/virtualized-list-table.component';
import { VirtualizedListComponent } from 'src/app/components/virtualized-list/virtualized-list.component';
import { VirtualizedViewportComponent } from 'src/app/components/virtualized-viewport/virtualized-viewport.component';

interface Data {
  name: string;
  age: number;
}

interface ListRange {
  start: number;
  end: number;
}

@Component({
  selector: 'angular-experiment-index',
  standalone: true,
  imports: [
    CommonModule,
    SetupComponent,
    DataImportComponent,
    DraggableComponent,
    SocketComponent,
    ReactiveFormsModule,
    MatInputModule,
    PingPongComponent,
    TableFormComponent,
    NgrxSignalStoreComponent,
    DynamicFormComponent,
    CustomSelectComponent,
    CdkOverlayComponent,
    VirtualizedListComponent,
    VirtualizedListTableComponent,
    VirtualizedViewportComponent,
  ],
  template: `
    <div>
      <angular-experiment-virtualized-viewport
        (itemsRangeChange)="updatePeopleSlice($event)"
        [totalItems]="people.length"
        [itemSize]="50"
      >
        <angular-experiment-virtualized-list
          [people]="peopleSlice"
          (personSelected)="personSelected.emit($event)"
        >
        </angular-experiment-virtualized-list>
      </angular-experiment-virtualized-viewport>
      <angular-experiment-virtualized-list-table></angular-experiment-virtualized-list-table>
      <angular-experiment-cdk-overlay></angular-experiment-cdk-overlay>
      <angular-experiment-custom-select></angular-experiment-custom-select>
      <angular-experiment-dynamic-form></angular-experiment-dynamic-form>
      <angular-experiment-ngrx-signal-store></angular-experiment-ngrx-signal-store>
      <angular-experiment-table-form></angular-experiment-table-form>
      <angular-experiment-draggable></angular-experiment-draggable>
      <angular-experiment-setup></angular-experiment-setup>
      <form [formGroup]="form">
        <angular-experiment-data-import
          formControlName="importType"
        ></angular-experiment-data-import>
        <input matInput formControlName="projectName" />
        <button (click)="submit()">send</button>
      </form>
      <angular-experiment-ping-pong></angular-experiment-ping-pong>
      <!-- <angular-experiment-socket></angular-experiment-socket> -->
    </div>
  `,
  styleUrl: './index.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent implements OnInit {
  people: Data[] = [];
  @Output() personSelected = new EventEmitter<Data>();

  peopleSlice: Data[] = [];

  #fb = inject(FormBuilder);
  form!: FormGroup;

  generateData() {
    const data = [];
    for (let i = 0; i < 500; i++) {
      data.push({
        name: `name-${i}`,
        age: i,
      });
    }
    return data;
  }

  ngOnInit() {
    this.form = this.#fb.group({
      importType: ['history'],
      projectName: ['', Validators.required],
    });
    this.form.valueChanges.subscribe((value) => console.log('value', value));
    this.people = this.generateData();
  }

  submit() {
    console.log('this.form', this.form.value);
  }

  updatePeopleSlice(range: ListRange) {
    console.log('updatePeopleSlice', range);
    this.peopleSlice = this.people.slice(range.start, range.end);
  }
}
