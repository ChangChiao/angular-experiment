import { AbstractControl, ValidationErrors } from '@angular/forms';

export const banWords =
  (banWords: string[] = []) =>
  (control: AbstractControl): ValidationErrors | null => {
    return control.value.toLocaleLowerCase().includes(banWords.toLocaleString())
      ? { banWords: { banWords: banWords } }
      : null;
  };
