import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[angularExperimentPasswordShouldMatch]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordShouldMatchDirective,
      multi: true,
    },
  ],
})
export class PasswordShouldMatchDirective implements Validator {
  constructor() {}
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    const error = { angularExperimentPasswordShouldMatch: { mismatch: true } };
    if (password?.value === confirmPassword?.value) return null;

    confirmPassword?.setErrors(error);

    return error;
  }
}
