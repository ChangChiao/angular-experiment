import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { banWords } from './ban-words.validator';
import { passwordShouldMatch } from './password-should-match';
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
  // form = new FormGroup({
  //   userName: new FormControl(''),
  //   email: new FormControl(''),
  //   password: new FormGroup({
  //     password: new FormControl(''),
  //     confirmPassword: new FormControl(''),
  //   }),
  //   phones: new FormArray([
  //     new FormGroup({
  //       label: new FormControl(this.phoneLabels[0]),
  //       phone: new FormControl(''),
  //     }),
  //   ]),
  //   skill: new FormGroup({}),
  // });

  form = this.fb.group({
    userName: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+$/),
        banWords(['test']),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    birthDate: this.fb.nonNullable.control(''), //avoid null or undefined
    password: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
    }),
    phones: this.fb.array([
      this.fb.group(
        {
          label: this.phoneLabels[0],
          phone: [''],
        },
        { validators: passwordShouldMatch }
      ),
    ]),
    skill: this.fb.group({}),
  });

  constructor(private userSkills: UserSkillService, private fb: FormBuilder) {}

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

  removePhone(index: number) {
    this.form.controls.phones.removeAt(index);
  }

  onSubmit() {
    console.log('form', this.form.value);
  }

  buildSkillControls(skills: string[]) {
    skills.forEach((skill) => {
      this.form.controls.skill.addControl(skill, new FormControl(false));
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
