import { AircraftsEntity } from './aircrafts.models';
import {
  AircraftsState,
  aircraftsAdapter,
  initialState
} from './aircrafts.reducer';
import * as AircraftsSelectors from './aircrafts.selectors';

describe('Aircrafts Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAircraftsId = it => it['id'];
  const createAircraftsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as AircraftsEntity);

  let state;

  beforeEach(() => {
    state = {
      aircrafts: aircraftsAdapter.addAll(
        [
          createAircraftsEntity('PRODUCT-AAA'),
          createAircraftsEntity('PRODUCT-BBB'),
          createAircraftsEntity('PRODUCT-CCC')
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

  describe('Aircrafts Selectors', () => {
    it('getAllAircrafts() should return the list of Aircrafts', () => {
      const results = AircraftsSelectors.getAllAircrafts(state);
      const selId = getAircraftsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = AircraftsSelectors.getSelected(state);
      const selId = getAircraftsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getAircraftsLoaded() should return the current 'loaded' status", () => {
      const result = AircraftsSelectors.getAircraftsLoaded(state);

      expect(result).toBe(true);
    });

    it("getAircraftsError() should return the current 'error' state", () => {
      const result = AircraftsSelectors.getAircraftsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
