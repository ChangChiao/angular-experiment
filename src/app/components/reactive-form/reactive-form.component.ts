import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, bufferCount, filter, startWith, tap } from 'rxjs';
import { banWords } from './ban-words.validator';
import { passwordShouldMatch } from './password-should-match.validator';
import { UniqueNicknameValidator } from './unique-nickname.validator';
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
      {
        validators: [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]+$/),
          banWords(['test']),
        ],
        asyncValidators: [
          this.uniqueNickName.validate.bind(this.uniqueNickName),
        ],
        updateOn: 'blur',
      },
    ],
    email: ['', [Validators.required, Validators.email]],
    birthDate: this.fb.nonNullable.control(''),
    passport: [''], //avoid null or undefined
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

  constructor(
    private userSkills: UserSkillService,
    private fb: FormBuilder,
    private uniqueNickName: UniqueNicknameValidator,
    private cd: ChangeDetectorRef
  ) {}

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

  onSubmit(e: Event) {
    this.form.reset();
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

    this.form.controls.birthDate.valueChanges
      .pipe(startWith(this.form.controls.birthDate.value))
      .subscribe((val) => {
        if (true) {
          this.form.controls.passport.addValidators(Validators.required);
        } else {
          this.form.controls.passport.removeValidators(Validators.required);
        }
        this.form.controls.passport.updateValueAndValidity();
        this.form.controls.passport.markAsDirty();
      });

    this.form.statusChanges
      .pipe(
        bufferCount(2, 1),
        filter(([prev]) => prev === 'PENDING')
      )
      .subscribe((status) => {
        this.cd.markForCheck();
        console.log('form status', status);
      });
  }
}
