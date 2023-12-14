import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FlightBookingStore } from './store/ngrx-signals.store';

@Component({
  selector: 'angular-experiment-ngrx-signals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngrx-signals.component.html',
  styleUrl: './ngrx-signals.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgrxSignalsComponent {
  private store = inject(FlightBookingStore);

  // Getting Signals from Store
  from = this.store['from'];
  to = this.store['to'];
  basket = this.store['basket'];
  flights = this.store['flights'];
  selected = this.store['selected'];

  // Getting Signal from Extension
  loading = this.store['loading'];

  async search() {
    this.store.load();
  }
}
