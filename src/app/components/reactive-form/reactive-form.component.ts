import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { UserSkillService } from './user-skill.service';

@Component({
  selector: 'angular-experiment-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormComponent implements OnInit {
  phoneLabels = ['home', 'work', 'mobile'];
  skill$!: Observable<string[]>;
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
    skill: new FormGroup({}),
  });

  constructor(private userSkills: UserSkillService) {}

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

  onSubmit() {
    console.log('form', this.form.value);
  }

  buildSkillControls(skills: string[]) {
    skills.forEach((skill) => {
      this.form.controls.skill.addControl(
        skill,
        new FormControl(false, { nonNullable: true })
      );
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((val) => {
      console.log('form value changed', val);
    });

    this.skill$ = this.userSkills.getSkills().pipe(
      tap((skills) => {
        this.buildSkillControls(skills);
      })
    );
  }
}
