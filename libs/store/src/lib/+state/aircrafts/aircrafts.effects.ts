import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { AircraftsPartialState } from './aircrafts.reducer';
import * as AircraftsActions from './aircrafts.actions';
import { switchMap, tap, withLatestFrom, map, filter } from 'rxjs/operators'
import { AircraftsService } from '@flights/data'
import { loadAircraftsSuccess } from './aircrafts.actions';
import { AircraftsEntity } from './aircrafts.models';
import { Store } from '@ngrx/store';
import { getFlightFilters, getAllFlights } from '../flights/flights.selectors';
import { autoFilter } from '../rotations/rotations.actions';

@Injectable()
export class AircraftsEffects {
  // @Effect({dispatch:false})
  // test = this.actions$.pipe(tap(a=>{}))

  @Effect()
  loadAircrafts$ = this.actions$.pipe(ofType(AircraftsActions.loadAircrafts),switchMap(()=>{
    return this.aircraftsScervice.getAircrafts().then((_data:any) =>{
      const dic:{[id:string]:AircraftsEntity} = _data.data.reduce((acc,_item:AircraftsEntity) =>{
        acc[_item.ident] = _item
        return acc
      },{}) //convert to entitaty dictionary
      return loadAircraftsSuccess({aircrafts: dic})
    })
  }))

  @Effect()
  addAircraft$ = this.actions$.pipe(ofType(AircraftsActions.addAircraft),withLatestFrom(this.store.select(getAllFlights)),map(_data =>{
    const flights = _data[1];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    //random ID
    const ident = characters[Math.round(Math.random() * 25)] + characters[Math.round(Math.random() * 25)] + characters[Math.round(Math.random() * 25)] + characters[Math.round(Math.random() * 25)] + characters[Math.round(Math.random() * 25)]
    const base = flights[Math.round(Math.random() * (flights.length - 1))].origin; //get base from a rendom flight


    return loadAircraftsSuccess({aircrafts: {
      [ident]:{
        ident,
        base,
        type:"A320",
        economySeats:186
      }
    }})
  }))

  @Effect()
  autoFilter$ = this.actions$.pipe(ofType(AircraftsActions.setSelectedAircraft),
  withLatestFrom(this.store.select(getFlightFilters)),map(_data =>{
    return !!_data[1].autoFilter
  }),filter(_val => !!_val), map(()=>{
    return autoFilter() //update filters
  }))

  constructor(
    private actions$: Actions,
    private aircraftsScervice: AircraftsService,
    private store : Store<any>
  ) {}
}
