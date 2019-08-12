import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { AircraftsEffects } from './aircrafts.effects';
import * as AircraftsActions from './aircrafts.actions';

describe('AircraftsEffects', () => {
  let actions: Observable<any>;
  let effects: AircraftsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        AircraftsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(AircraftsEffects);
  });

  describe('loadAircrafts$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: AircraftsActions.loadAircrafts() });

      const expected = hot('-a-|', {
        a: AircraftsActions.loadAircraftsSuccess({ aircrafts: [] })
      });

      expect(effects.loadAircrafts$).toBeObservable(expected);
    });
  });
});
