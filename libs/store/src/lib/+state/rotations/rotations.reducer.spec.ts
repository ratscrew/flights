import { RotationsEntity } from './rotations.models';
import * as RotationsActions from './rotations.actions';
import { RotationsState, initialState, reducer } from './rotations.reducer';

describe('Rotations Reducer', () => {
  const createRotationsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as RotationsEntity);

  beforeEach(() => {});

  describe('valid Rotations actions', () => {
    it('loadRotationsSuccess should return set the list of known Rotations', () => {
      const rotations = [
        createRotationsEntity('PRODUCT-AAA'),
        createRotationsEntity('PRODUCT-zzz')
      ];
      const action = RotationsActions.loadRotationsSuccess({ rotations });

      const result: RotationsState = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
