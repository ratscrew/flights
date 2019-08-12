import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  AIRCRAFTS_FEATURE_KEY,
  AircraftsState,
  AircraftsPartialState,
  aircraftsAdapter
} from './aircrafts.reducer';
import { AircraftsEntity } from './aircrafts.models';

// Lookup the 'Aircrafts' feature state managed by NgRx
export const getAircraftsState = createFeatureSelector(AIRCRAFTS_FEATURE_KEY); //

const { selectAll, selectEntities } = aircraftsAdapter.getSelectors();

export const getAircraftsLoaded = createSelector(
  getAircraftsState,
  (state: AircraftsState) => state.loaded
);

export const getAircraftsError = createSelector(
  getAircraftsState,
  (state: AircraftsState) => state.error
);

export const getAllAircrafts = createSelector(
  getAircraftsState,
  (state: AircraftsState):AircraftsEntity[] => {
    return <AircraftsEntity[]> Object.values(state.aircrafts)
  }
);

export const getAircraftsEntities = createSelector(
  getAircraftsState,
  (state: AircraftsState) => selectEntities(state)
);

export const getSelectedAircraftId = createSelector(
  getAircraftsState,
  (state: AircraftsState) => state.selectedId
);

export const getSelectedAircraft = createSelector(
  getAircraftsState,
  (state: AircraftsState) => state.aircrafts[state.selectedId]
);


