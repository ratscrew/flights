import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as RotationsActions from './rotations.actions';
import { RotationsEntity } from './rotations.models';

export const ROTATIONS_FEATURE_KEY = 'rotations';

export interface RotationsState extends EntityState<RotationsEntity> {
  selectedId?: string | number; // which Rotations record has been selected
  loaded: boolean; // has the Rotations list been loaded
  error?: string | null; // last none error (if any),
  selectedDate?: Date;
  rotations:{
    [_id:string]:RotationsEntity
  }
}

export interface RotationsPartialState {
  readonly [ROTATIONS_FEATURE_KEY]: RotationsState;
}

export const rotationsAdapter: EntityAdapter<
  RotationsEntity
> = createEntityAdapter<RotationsEntity>();

const initialState: RotationsState = rotationsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  rotations:{}
});

const rotationsReducer = createReducer(
  initialState,
  on(RotationsActions.loadRotations, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(RotationsActions.loadRotationsSuccess, (state, { rotations }) =>
    rotationsAdapter.addAll(rotations, { ...state, loaded: true })
  ),
  on(RotationsActions.loadRotationsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(RotationsActions.setRotationDate, (state, { date }) => ({
    ...state,
    selectedDate:date
  })),
  on(RotationsActions.saveRotation, (state, { id, updates }) => {
    return {
      ...state,
      rotations:{
        ...state.rotations, 
        [id]:{
          ...(state.rotations[id] || {}) ,
           ...updates
          } 
        }
    }
  })
);

export function RotationsReducer(state: RotationsState | undefined, action: Action) {
  return rotationsReducer(state, action);
}
