import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSkillService {
  constructor() {}
  getSkills() {
    return of(['Angular', 'React', 'Vue', 'Ember', 'Backbone']).pipe(
      delay(1000)
    );
  }
}
