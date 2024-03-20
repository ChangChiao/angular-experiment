import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UniqueNicknameValidator implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate(
    control: AbstractControl
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
