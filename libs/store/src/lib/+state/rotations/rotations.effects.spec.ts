import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { RotationsEffects } from './rotations.effects';
import * as RotationsActions from './rotations.actions';

describe('RotationsEffects', () => {
  let actions: Observable<any>;
  let effects: RotationsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        RotationsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(RotationsEffects);
  });

  describe('loadRotations$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: RotationsActions.loadRotations() });

      const expected = hot('-a-|', {
        a: RotationsActions.loadRotationsSuccess({ rotations: [] })
      });

      expect(effects.loadRotations$).toBeObservable(expected);
    });
  });
});
