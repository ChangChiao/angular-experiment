import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'angular-experiment-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnInit {
  #form = inject(FormBuilder);
  form = this.#form.group({
    toggle: [false],
    name: [''],
  });

  setValidators() {
    this.form
      .get('name')
      ?.setValidators([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]);
    this.form.get('name')?.updateValueAndValidity();
  }

  clearValidators() {
    this.form.get('name')?.clearValidators();
    this.form.get('name')?.updateValueAndValidity();
  }

  ngOnInit() {
    this.form.get('toggle')?.valueChanges.subscribe((value) => {
      if (value) {
        this.setValidators();
      } else {
        this.clearValidators();
      }
    });

    // cause for loop

    // this.form.valueChanges.subscribe((value) => {
    //   console.log('value', value);
    //   if (value.toggle) {
    //     this.setValidators();
    //   } else {
    //     this.clearValidators();
    //   }
    // });
  }
}
