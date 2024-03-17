import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'angular-experiment-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormComponent {
  phoneLabels = ['home', 'work', 'mobile'];
  form = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormGroup({
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    }),
    phones: new FormArray([
      new FormGroup({
        label: new FormControl(this.phoneLabels[0]),
        phone: new FormControl(''),
      }),
    ]),
  });

  addPhone() {
    // this.form.controls.phones.push(new FormControl(''));
    this.form.controls.phones.insert(
      0,
      new FormGroup({
        label: new FormControl(),
        phone: new FormControl(''),
      })
    );
  }

  remove(index: number) {
    this.form.controls.phones.removeAt(index);
  }
}
