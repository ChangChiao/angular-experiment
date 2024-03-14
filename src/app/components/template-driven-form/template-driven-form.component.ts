import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'angular-experiment-template-driven-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './template-driven-form.component.html',
  styleUrl: './template-driven-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateDrivenFormComponent {
  data = {
    userName: '',
    password: '',
    address: {
      city: '',
      street: '',
    },
  };

  onSubmitForm(form: NgForm) {
    console.log('form', form.value);
  }
}
