import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FLIGHTS_FEATURE_KEY,
  FlightsState,
  FlightsPartialState,
  flightsAdapter
} from './flights.reducer';

// Lookup the 'Flights' feature state managed by NgRx
export const getFlightsState = createFeatureSelector(FLIGHTS_FEATURE_KEY);

const { selectAll, selectEntities } = flightsAdapter.getSelectors();

export const getFlightsLoaded = createSelector(
  getFlightsState,
  (state: FlightsState) => state.loaded
);

export const getFlightsError = createSelector(
  getFlightsState,
  (state: FlightsState) => state.error
);

export const getAllFlights = createSelector(
  getFlightsState,
  (state: FlightsState) => Object.values(state.flights)
);

export const getFlightsCount = createSelector(
  getAllFlights,
  (flights) => flights.length
);

export const getFlightsEntities = createSelector(
  getFlightsState,
  (state: FlightsState) => state.flights
);

export const getSelectedFlightId = createSelector(
  getFlightsState,
  (state: FlightsState) => state.selectedId
);

export const getSelectedFlight = createSelector(
  getFlightsEntities,
  getSelectedFlightId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getFlightProgress = createSelector(
  getFlightsState,
  (state: FlightsState) => state.progress
);

export const getFlightFilters = createSelector(
  getFlightsState,
  (state: FlightsState) => state.filters
);
