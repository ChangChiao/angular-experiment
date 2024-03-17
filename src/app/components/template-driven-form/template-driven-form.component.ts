import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class TemplateDrivenFormComponent {
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

  get isAdultUserName() {
    return this.data.userName.startsWith('adult');
  }

  onSubmitForm(form: NgForm) {
    console.log('form', form.value);
  }
}
