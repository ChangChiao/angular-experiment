import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DataImportComponent } from 'src/app/components/data-import/data-import.component';
import { DraggableComponent } from 'src/app/components/draggable/draggable.component';
import { NgrxSignalStoreComponent } from 'src/app/components/ngrx-signal-store/ngrx-signal-store.component';
import { PingPongComponent } from 'src/app/components/ping-pong/ping-pong.component';
import { SetupComponent } from 'src/app/components/setup/setup.component';
import { SocketComponent } from 'src/app/components/socket.component';
import { TableFormComponent } from 'src/app/components/table-form/table-form.component';

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
  ],
  template: `
    <div>
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
  #fb = inject(FormBuilder);
  form!: FormGroup;

  ngOnInit() {
    this.form = this.#fb.group({
      importType: ['history'],
      projectName: ['', Validators.required],
    });
    this.form.valueChanges.subscribe((value) => console.log('value', value));
  }

  submit() {
    console.log('this.form', this.form.value);
  }
}
