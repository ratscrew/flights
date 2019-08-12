import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ROTATIONS_FEATURE_KEY,
  RotationsState,
  RotationsPartialState,
  rotationsAdapter
} from './rotations.reducer';
import { RotationsEntity } from './rotations.models';

// Lookup the 'Rotations' feature state managed by NgRx
export const getRotationsState = createFeatureSelector(ROTATIONS_FEATURE_KEY); //<RotationsPartialState,RotationsState>

const { selectAll, selectEntities } = rotationsAdapter.getSelectors();

export const getRotationsLoaded = createSelector(
  getRotationsState,
  (state: RotationsState) => state.loaded
);

export const getRotationsError = createSelector(
  getRotationsState,
  (state: RotationsState) => state.error
);

export const getAllRotations = createSelector(
  getRotationsState,
  (state: RotationsState) => selectAll(state)
);

export const getRotationsEntities = createSelector(
  getRotationsState,
  (state: RotationsState) => selectEntities(state)
);

export const getRotationSelectedId = createSelector(
  getRotationsState,
  (state: RotationsState) => state.selectedId
);

export const getRotationSelectedDate = createSelector(
  getRotationsState,
  (state: RotationsState) => state.selectedDate
);

export const getSelectedRotation = createSelector(
  getRotationsEntities,
  getRotationSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getRotationsForDate = createSelector(
  getRotationsState,
  (state: RotationsState):RotationsEntity[] => {
    return Object.values(state.rotations).filter((_r:RotationsEntity) => _r.date.toString() === state.selectedDate.toString())
  }
);
