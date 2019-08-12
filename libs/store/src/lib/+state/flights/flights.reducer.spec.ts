import { FlightsEntity } from './flights.models';
import * as FlightsActions from './flights.actions';
import { FlightsState, initialState, reducer } from './flights.reducer';

describe('Flights Reducer', () => {
  const createFlightsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as FlightsEntity);

  beforeEach(() => {});

  describe('valid Flights actions', () => {
    it('loadFlightsSuccess should return set the list of known Flights', () => {
      const flights = [
        createFlightsEntity('PRODUCT-AAA'),
        createFlightsEntity('PRODUCT-zzz')
      ];
      const action = FlightsActions.loadFlightsSuccess({ flights });

      const result: FlightsState = reducer(initialState, action);

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
