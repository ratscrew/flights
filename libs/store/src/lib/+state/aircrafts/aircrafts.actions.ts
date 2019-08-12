import { createAction, props } from '@ngrx/store';
import { AircraftsEntity } from './aircrafts.models';

export const loadAircrafts = createAction('[Aircrafts] Load Aircrafts');

export const loadAircraftsSuccess = createAction(
  '[Aircrafts] Load Aircrafts Success',
  props<{ aircrafts: {[id:string]: AircraftsEntity} }>()
);

export const loadAircraftsFailure = createAction(
  '[Aircrafts] Load Aircrafts Failure',
  props<{ error: any }>()
);

export const setSelectedAircraft = createAction(
  '[Aircrafts] Set Selected Aircraft',
  props<{ id: string }>()
);

export const addAircraft = createAction('[Aircrafts] Add Aircraft');


