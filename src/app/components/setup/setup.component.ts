import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { AvatarComponent } from '@joe_chang/ui';
import { set as setFeatureToggle } from 'feature-toggle-service';
import { FeatureToggleModule } from 'ngx-feature-toggle';

@Component({
  selector: 'angular-experiment-setup',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FeatureToggleModule,
    MatRadioModule,
    AvatarComponent,
  ],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetupComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  form!: UntypedFormGroup;
  flag = false;
  TYPE_KEY = 'type';

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  get typeFormControl() {
    return this.form.controls['type'];
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      type: ['1', Validators.required],
    });
    this.typeFormControl?.valueChanges.subscribe((val) => {
      setFeatureToggle({ [this.TYPE_KEY]: val === '1' });
    });
  }
}
