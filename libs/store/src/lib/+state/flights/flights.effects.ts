import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { FlightsPartialState } from './flights.reducer';
import * as FlightsActions from './flights.actions';
import { switchMap, map } from 'rxjs/operators';
import { FlightsService } from '@flights/data';

@Injectable()
export class FlightsEffects {
  @Effect()
  loadFlights$ = this.actions$.pipe(ofType(FlightsActions.loadFlights),switchMap(()=>{
    return this.flightsService.$getFlights()
  }),map((_data:any) => {
    const flights = _data.flights.reduce((acc,_item)=>{
      acc[_item.id] = _item;
      return acc
    },{}) //convert to entitaty dictionary
    return FlightsActions.loadFlightsSuccess({progress:_data.progress,flights})
  }))

  constructor(
    private actions$: Actions,
    private flightsService: FlightsService
  ) {}
}
