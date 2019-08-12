import { RotationsEntity } from './rotations.models';
import {
  RotationsState,
  rotationsAdapter,
  initialState
} from './rotations.reducer';
import * as RotationsSelectors from './rotations.selectors';

describe('Rotations Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getRotationsId = it => it['id'];
  const createRotationsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as RotationsEntity);

  let state;

  beforeEach(() => {
    state = {
      rotations: rotationsAdapter.addAll(
        [
          createRotationsEntity('PRODUCT-AAA'),
          createRotationsEntity('PRODUCT-BBB'),
          createRotationsEntity('PRODUCT-CCC')
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

  describe('Rotations Selectors', () => {
    it('getAllRotations() should return the list of Rotations', () => {
      const results = RotationsSelectors.getAllRotations(state);
      const selId = getRotationsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = RotationsSelectors.getSelected(state);
      const selId = getRotationsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getRotationsLoaded() should return the current 'loaded' status", () => {
      const result = RotationsSelectors.getRotationsLoaded(state);

      expect(result).toBe(true);
    });

    it("getRotationsError() should return the current 'error' state", () => {
      const result = RotationsSelectors.getRotationsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
