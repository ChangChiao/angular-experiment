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
  form = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormGroup({
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    }),
    phones: new FormArray([new FormControl('')]),
  });
}
