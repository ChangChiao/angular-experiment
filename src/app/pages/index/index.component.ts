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
import { SetupComponent } from 'src/app/components/setup/setup.component';

@Component({
  selector: 'angular-experiment-index',
  standalone: true,
  imports: [
    CommonModule,
    SetupComponent,
    DataImportComponent,
    DraggableComponent,
    ReactiveFormsModule,
    MatInputModule,
  ],
  template: `
    <div>
      <angular-experiment-draggable></angular-experiment-draggable>
      <angular-experiment-setup></angular-experiment-setup>
      <form [formGroup]="form">
        <angular-experiment-data-import
          formControlName="importType"
        ></angular-experiment-data-import>
        <input matInput formControlName="projectName" />
        <button (click)="submit()">send</button>
      </form>
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
