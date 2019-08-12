import { FlightsEntity } from './flights.models';
import { FlightsState, flightsAdapter, initialState } from './flights.reducer';
import * as FlightsSelectors from './flights.selectors';

describe('Flights Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getFlightsId = it => it['id'];
  const createFlightsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as FlightsEntity);

  let state;

  beforeEach(() => {
    state = {
      flights: flightsAdapter.addAll(
        [
          createFlightsEntity('PRODUCT-AAA'),
          createFlightsEntity('PRODUCT-BBB'),
          createFlightsEntity('PRODUCT-CCC')
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Flights Selectors', () => {
    it('getAllFlights() should return the list of Flights', () => {
      const results = FlightsSelectors.getAllFlights(state);
      const selId = getFlightsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = FlightsSelectors.getSelected(state);
      const selId = getFlightsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getFlightsLoaded() should return the current 'loaded' status", () => {
      const result = FlightsSelectors.getFlightsLoaded(state);

      expect(result).toBe(true);
    });

    it("getFlightsError() should return the current 'error' state", () => {
      const result = FlightsSelectors.getFlightsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
