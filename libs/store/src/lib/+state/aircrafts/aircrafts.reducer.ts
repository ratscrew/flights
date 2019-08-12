import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as AircraftsActions from './aircrafts.actions';
import { AircraftsEntity } from './aircrafts.models';

export const AIRCRAFTS_FEATURE_KEY = 'aircrafts';

export interface AircraftsState extends EntityState<AircraftsEntity> {
  aircrafts:{[id:string]:AircraftsEntity};
  selectedId?: string | number; // which Aircrafts record has been selected
  loaded: boolean; // has the Aircrafts list been loaded
  error?: string | null; // last none error (if any)
}

export interface AircraftsPartialState {
  readonly [AIRCRAFTS_FEATURE_KEY]: AircraftsState;
}

export const aircraftsAdapter: EntityAdapter<
  AircraftsEntity
> = createEntityAdapter<AircraftsEntity>();

const initialState: AircraftsState = aircraftsAdapter.getInitialState({
  // set initial required properties
  aircrafts:{},
  loaded: false
});

const aircraftsReducer = createReducer(
  initialState,
  on(AircraftsActions.loadAircrafts, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(AircraftsActions.loadAircraftsSuccess, (state, { aircrafts }) => ({
      ...state,
      loaded:true, 
      aircrafts: {...(state.aircrafts || {}), ...aircrafts}
  })),
  on(AircraftsActions.loadAircraftsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(AircraftsActions.setSelectedAircraft, (state, { id }) => ({
    ...state,
    selectedId:id
  }))
);

export function Aircraftsreducer(state: AircraftsState | undefined, action: Action) {
  return aircraftsReducer(state, action);
}

