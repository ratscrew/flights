import { createAction, props } from '@ngrx/store';
import { FlightsEntity } from './flights.models';

export const loadFlights = createAction('[Flights] Load Flights');

export const loadFlightsSuccess = createAction(
  '[Flights] Load Flights Success',
  props<{ flights: {[id:string]:FlightsEntity}, progress:number }>()
);

export const loadFlightsFailure = createAction(
  '[Flights] Load Flights Failure',
  props<{ error: any }>()
);

export const setFlightFilters = createAction(
  '[Flights] Set Flight Filters',
  props<{ filters: {[key:string]:any} }>()
);
