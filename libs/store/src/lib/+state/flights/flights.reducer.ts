import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as FlightsActions from './flights.actions';
import { FlightsEntity } from './flights.models';

export const FLIGHTS_FEATURE_KEY = 'flights';

export interface FlightsState extends EntityState<FlightsEntity> {
  flights:{[id:string]:FlightsEntity};
  selectedId?: string | number; // which Flights record has been selected
  loaded: boolean; // has the Flights list been loaded
  progress:number;
  error?: string | null; // last none error (if any),
  filters:{
    origin?:string | null,
    destination?:string | null,
    departuretime?:number | null,
    arrivaltime?:number | null,
    alreadyInUs?:boolean,
    autoFilter:boolean
  }
}

export interface FlightsPartialState {
  readonly [FLIGHTS_FEATURE_KEY]: FlightsState;
}

export const flightsAdapter: EntityAdapter<FlightsEntity> = createEntityAdapter<
  FlightsEntity
>();

const initialState: FlightsState = flightsAdapter.getInitialState({
  // set initial required properties
  flights:{},
  progress:0,
  loaded: false,
  filters:{
    autoFilter:true
  }
});

const flightsReducer = createReducer(
  initialState,
  on(FlightsActions.loadFlights, state => ({
    ...state,
    loaded: false,
    progress:0,
    error: null
  })),
  on(FlightsActions.loadFlightsSuccess, (state, { flights, progress }) =>{

    return {
      ...state,
      loaded: progress === 1,
      flights: {...state.flights, ...flights},
      progress
    }
  }),
  on(FlightsActions.loadFlightsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(FlightsActions.setFlightFilters, (state, { filters }) => ({
    ...state,
    filters:{...state.filters, ...filters}
  }))
);


export function Flightsreducer(state: FlightsState | undefined, action: Action) {
  return flightsReducer(state, action);
}
