import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { FlightService } from '../ngrx-signals.service';
import {
  setLoaded,
  setLoading,
  withCallState,
} from './ngrx-signal-with-call-state';

interface Flight {
  id: string;
  model: string;
}

export const FlightBookingStore = signalStore(
  { providedIn: 'root' },

  // State Properties
  withState({
    from: 'Paris',
    to: 'London',
    initialized: false,
    flights: [] as Flight[],
    basket: {} as Record<number, boolean>,
  }),

  // Calculated State
  withComputed(({ flights, basket, from, to }) => ({
    selected: computed(() => flights().filter((f) => basket()[f.id])),
    criteria: computed(() => ({ from: from(), to: to() })),
  })),

  // Extension
  withCallState(),

  // Methods
  withMethods((state) => {
    const { basket, flights, from, to, initialized } = state;
    const flightService = inject(FlightService);

    return {
      load: async () => {
        if (!from() || !to()) return;

        // Updating the extension’s state (callState)
        patchState(state, setLoading());

        const flights = (await flightService.findPromise(
          from(),
          to()
        )) as Flight[];
        if (flights) {
          patchState(state, { flights });
        }

        // Updating the extension’s state (callState)
        patchState(state, setLoaded());
      },
    };
  })
);
