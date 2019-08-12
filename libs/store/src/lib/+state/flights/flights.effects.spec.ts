import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { FlightsEffects } from './flights.effects';
import * as FlightsActions from './flights.actions';

describe('FlightsEffects', () => {
  let actions: Observable<any>;
  let effects: FlightsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        FlightsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(FlightsEffects);
  });

  describe('loadFlights$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: FlightsActions.loadFlights() });

      const expected = hot('-a-|', {
        a: FlightsActions.loadFlightsSuccess({ flights: [] })
      });

      expect(effects.loadFlights$).toBeObservable(expected);
    });
  });
});
