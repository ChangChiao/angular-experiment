import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  forwardRef,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validator,
} from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'angular-experiment-data-import',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule],
  templateUrl: './data-import.component.html',
  styleUrl: './data-import.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DataImportComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DataImportComponent),
      multi: true,
    },
  ],
})
export class DataImportComponent
  implements OnInit, ControlValueAccessor, Validator
{
  #cd = inject(ChangeDetectorRef);
  #fb = inject(FormBuilder);
  form: FormGroup = this.#fb.group({
    type: ['latest'],
  });

  ngOnInit() {
    this.form = this.#fb.group({
      type: ['history'],
    });
    this.form.valueChanges.subscribe((val) => {
      this.onChange(val.type);
    });
  }

  writeValue(value: any): void {
    this.form.setValue({ type: value });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  validate() {
    return this.form.invalid ? { importError: true } : null;
  }
}
