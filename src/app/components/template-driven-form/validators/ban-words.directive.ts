import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[angularExperimentBanWords]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: BanWordsDirective,
      multi: true,
    },
  ],
})
export class BanWordsDirective implements Validator {
  @Input() set angularExperimentBanWords(value: string | string[]) {
    this.bannedWord = Array.isArray(value) ? value : [value];
  }
  private bannedWord: string[] = [];

  constructor() {}

  validate(control: AbstractControl<string>): ValidationErrors | null {
    const foundBannedWord = this.bannedWord.find((word) => {
      return word.toLocaleLowerCase() === control.value.toLocaleLowerCase();
    });
    return !foundBannedWord
      ? null
      : {
          angularExperimentBanWords: {
            bannedWord: foundBannedWord,
          },
        };
  }
}
