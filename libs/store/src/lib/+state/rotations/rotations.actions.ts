import { createAction, props } from '@ngrx/store';
import { RotationsEntity } from './rotations.models';

export const loadRotations = createAction('[Rotations] Load Rotations');

export const loadRotationsSuccess = createAction(
  '[Rotations] Load Rotations Success',
  props<{ rotations: RotationsEntity[] }>()
);

export const loadRotationsFailure = createAction(
  '[Rotations] Load Rotations Failure',
  props<{ error: any }>()
);

export const setRotationDate = createAction(
  '[Rotations] Set Rotation Date',
  props<{ date: Date }>()
);

export const addFlight = createAction(
  '[Rotations] Add Flight',
  props<{ id:string }>()
);

export const removeFlight = createAction(
  '[Rotations] Remove Flight',
  props<{ id:string }>()
);

export const saveRotation = createAction(
  '[Rotations] Save Rotation',
  props<{ id:string, updates:{[key:string]:any} }>()
);

export const calcRotation = createAction(
  '[Rotations] Calc Rotation'
);

export const autoFilter = createAction(
  '[Rotations] auto filter'
);




