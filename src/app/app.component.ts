import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SetupComponent } from './components/setup.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, SetupComponent, RouterModule],
  selector: 'angular-experiment-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-experiment';
}
