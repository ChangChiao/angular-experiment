import { HttpClient } from '@angular/common/http';
import { Directive } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';

@Directive({
  selector: '[angularExperimentUniqueNickname]',
  standalone: true,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UniqueNicknameDirective,
      multi: true,
    },
  ],
})
export class UniqueNicknameDirective implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate(
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.http
      .get<any>(
        `https://jsonplaceholder.typicode.com/users?username=${control.value}`
      )
      .pipe(
        map((user) => (user.length ? { uniqueNickname: true } : null)),
        catchError(() => of({ uniqueNickname: true }))
      );
  }
}
