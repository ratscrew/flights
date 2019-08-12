import { AircraftsEntity } from './aircrafts.models';
import * as AircraftsActions from './aircrafts.actions';
import { AircraftsState, initialState, reducer } from './aircrafts.reducer';

describe('Aircrafts Reducer', () => {
  const createAircraftsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as AircraftsEntity);

  beforeEach(() => {});

  describe('valid Aircrafts actions', () => {
    it('loadAircraftsSuccess should return set the list of known Aircrafts', () => {
      const aircrafts = [
        createAircraftsEntity('PRODUCT-AAA'),
        createAircraftsEntity('PRODUCT-zzz')
      ];
      const action = AircraftsActions.loadAircraftsSuccess({ aircrafts });

      const result: AircraftsState = reducer(initialState, action);

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
