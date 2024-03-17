import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BanWordsDirective } from './validators/ban-words.directive';
import { PasswordShouldMatchDirective } from './validators/password-should-match.directive';
import { UniqueNicknameDirective } from './validators/unique-nickname.directive';

@Component({
  selector: 'angular-experiment-template-driven-form',
  standalone: true,
  imports: [
    CommonModule,
    BanWordsDirective,
    PasswordShouldMatchDirective,
    FormsModule,
    UniqueNicknameDirective,
  ],
  templateUrl: './template-driven-form.component.html',
  styleUrl: './template-driven-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateDrivenFormComponent implements AfterViewInit {
  data = {
    userName: '',
    password: {
      password: '',
      confirmPassword: '',
    },
    address: {
      city: '',
      street: '',
    },
    age: '',
  };

  @ViewChild('NgForm') form!: NgForm;

  private initialFormValues: unknown;

  get isAdultUserName() {
    return this.data.userName.startsWith('adult');
  }

  onSubmitForm() {
    console.log('form', this.form.value);
    this.form.resetForm(this.form.value);
    this.initialFormValues = this.form.value;
  }

  onReset(e: Event) {
    e.preventDefault();
    this.form.resetForm();
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      this.initialFormValues = this.form.value;
    });
  }
}
