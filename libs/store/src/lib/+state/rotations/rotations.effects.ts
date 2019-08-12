import { Injectable } from '@angular/core';
import { createEffect, Actions, Effect, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { RotationsPartialState } from './rotations.reducer';
import * as RotationsActions from './rotations.actions';
import { combineLatest, withLatestFrom, map, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getSelectedAircraftId, getSelectedAircraft } from '../aircrafts/aircrafts.selectors';
import { getFlightsEntities, getFlightFilters } from '../flights/flights.selectors';
import { getRotationSelectedDate } from './rotations.selectors';
import { getSelectedRotations } from './rotations.selectors.combo';
import { RotationsEntity } from './rotations.models';
import { saveRotation, calcRotation, autoFilter } from './rotations.actions';
import { setFlightFilters } from '../flights/flights.actions';

@Injectable()
export class RotationsEffects {
  @Effect()
  addFlight$ = this.actions$.pipe(ofType(RotationsActions.addFlight),
  withLatestFrom(this.store.select(getSelectedAircraftId), this.store.select(getRotationSelectedDate), this.store.select(getSelectedRotations), this.store.select(getFlightsEntities))
  ,map(_data =>{
    const payload = _data[0];
    const aircraftId = <string>_data[1];
    const date = _data[2];
    const rotation:RotationsEntity = <RotationsEntity>_data[3];
    const flightDocs = _data[4]

    const minutes20 = 60 * 20;
    const secondsInDay = 60 * 60 * 24 


    const updates:any = {
      ...rotation,
      date,
      aircraftId,
      id:aircraftId+date.toDateString(),
    }

    if(!rotation.flightIds)updates.flightIds = [payload.id] //if not flightIDs Create it

    if(!!rotation.flightIds && rotation.flightIds.indexOf(payload.id) === -1) updates.flightIds = ([...rotation.flightIds, payload.id]).sort((_a,_b)=>{
      if(flightDocs[_a].departuretime > flightDocs[_b].departuretime) return 1
      if(flightDocs[_a].departuretime < flightDocs[_b].departuretime) return -1
      else return 0;
    }) //sort flights by departuretime

 
    //save to store
    this.store.dispatch(saveRotation({id:updates.id, updates}))
    
    //check for errors
    return calcRotation()
  }))


  @Effect()
  removeFlight$ = this.actions$.pipe(ofType(RotationsActions.removeFlight),
  withLatestFrom(this.store.select(getSelectedAircraftId), this.store.select(getRotationSelectedDate), this.store.select(getSelectedRotations), this.store.select(getFlightsEntities))
  ,map(_data =>{
    const payload = _data[0];
    const aircraftId = <string>_data[1];
    const date = _data[2];
    const rotation:RotationsEntity = <RotationsEntity>_data[3];
    const flightDocs = _data[4]


    const updates:any = {
      ...rotation,
      date,
      aircraftId,
      id:aircraftId+date.toDateString(),
    }

    if(!!rotation.flightIds) updates.flightIds =  ([...rotation.flightIds, payload.id]).filter(id => id !== payload.id).sort((_a,_b)=>{
      if(flightDocs[_a].departuretime > flightDocs[_b].departuretime) return 1
      if(flightDocs[_a].departuretime < flightDocs[_b].departuretime) return -1
      else return 0;
    }) //filter then sort

    this.store.dispatch(saveRotation({id:updates.id, updates}))
    
    return calcRotation()
  }))

  @Effect()
  calcRotation$ = this.actions$.pipe(ofType(RotationsActions.calcRotation),
  withLatestFrom(this.store.select(getSelectedAircraftId), this.store.select(getRotationSelectedDate), this.store.select(getSelectedRotations), this.store.select(getFlightsEntities))
  ,map(_data =>{
    const payload = _data[0];
    const aircraftId = <string>_data[1];
    const date = _data[2];
    const rotation:RotationsEntity = <RotationsEntity>_data[3];
    const flightDocs = _data[4]

    const minutes20 = 60 * 20;
    const secondsInDay = 60 * 60 * 24 


    const updates:any = {
      id:aircraftId+date.toDateString(),
      utilization:0,
      minGroundUtilizationTime:0,
      errors:[],
      highlightErrorFields:{},
      valed:true
    }

    if(rotation.flightIds) rotation.flightIds.map(id => flightDocs[id]).forEach((_f,i)=>{
      const _f2 = !!rotation.flightIds[i + 1]?flightDocs[rotation.flightIds[i + 1]]:undefined;
      let minGroundUtilizationTime = minutes20;

      if(!!_f2 && !!_f.arrivaltime && !!_f2.departuretime && (_f.arrivaltime + minutes20) > _f2.departuretime){ // when the next flight takes off too soon
        updates.errors.push({
          msg:`Flight ${_f2.id} departs before the aircraft ${aircraftId} is ready.  20 minutes are needed between the arrival of flight ${_f.id} at ${_f.readable_arrival} and the departure of the next flight ${_f2.id}`
        })
        if(!updates.highlightErrorFields[_f.id]) updates.highlightErrorFields[_f.id] = {};
        updates.highlightErrorFields[_f.id]['arrivaltime'] = true;
        if(!updates.highlightErrorFields[_f2.id]) updates.highlightErrorFields[_f2.id] = {};
        updates.highlightErrorFields[_f2.id]['departuretime'] = true;
        updates.valed = false;

        minGroundUtilizationTime = (_f2.departuretime - _f.arrivaltime) > 0 ? _f2.departuretime - _f.arrivaltime : 0; // take the dif but not less then 0
      } 

      if(!!_f2 && !!_f.destination && !!_f2.origin && _f.destination !== _f2.origin){ // no teleporting
        updates.errors.push({
          msg:`Flight ${_f2.id} Must depart from where flight ${_f.id} landed.  Aircraft ${aircraftId} can not teleport.`
        })
        if(!updates.highlightErrorFields[_f.id]) updates.highlightErrorFields[_f.id] = {};
        updates.highlightErrorFields[_f.id]['destination'] = true;
        if(!updates.highlightErrorFields[_f2.id]) updates.highlightErrorFields[_f2.id] = {};
        updates.highlightErrorFields[_f2.id]['origin'] = true;
        updates.valed = false;
      }

      if(!!_f.departuretime && !!_f.arrivaltime && _f.departuretime > _f.arrivaltime){ // on the groung at midnight
        updates.errors.push({
          msg:`Flight ${_f.id} Will not be on on the ground by midnight and aircraft ${aircraftId} needs to be.`
        })
        if(!updates.highlightErrorFields[_f.id]) updates.highlightErrorFields[_f.id] = {};
        updates.highlightErrorFields[_f.id]['arrivaltime'] = true;
        updates.valed = false;

        updates.utilization+= ((secondsInDay - _f.departuretime)/secondsInDay)
      }
      else if(!!_f2 && !!_f.arrivaltime && !!_f2.departuretime && _f.arrivaltime > _f2.departuretime){ // overlapping flights
        updates.utilization+= ((_f2.departuretime - _f.departuretime)/secondsInDay)
      }
      else{
        updates.utilization+= ((_f.arrivaltime - _f.departuretime)/secondsInDay)
        updates.minGroundUtilizationTime+= (minGroundUtilizationTime)/secondsInDay
      }

      
    })

    

    return saveRotation({id:updates.id, updates})
    
    
  }))


  @Effect()
  save$ = this.actions$.pipe(ofType(RotationsActions.saveRotation),
  withLatestFrom(this.store.select(getFlightFilters)),map(_data =>{
    return !!_data[1].autoFilter
  }),filter(_val => !!_val), map(()=>{
    return autoFilter()
  }))

  @Effect()
  setDate$ = this.actions$.pipe(ofType(RotationsActions.setRotationDate),
  withLatestFrom(this.store.select(getFlightFilters)),map(_data =>{
    return !!_data[1].autoFilter
  }),filter(_val => !!_val), map(()=>{
    return autoFilter()
  }))


  @Effect()
  autoFilter$ = this.actions$.pipe(ofType(RotationsActions.autoFilter),
  withLatestFrom(this.store.select(getSelectedAircraft), this.store.select(getRotationSelectedDate), this.store.select(getSelectedRotations), this.store.select(getFlightsEntities))
  ,map(_data =>{  //build a filter so show the next flights you might want
    const payload = _data[0];
    const aircraft = _data[1];
    const date = _data[2];
    const rotation:RotationsEntity = <RotationsEntity>_data[3];
    const flightDocs = _data[4]

    const minutes20 = 60 * 20;

    const filters = {
      origin:null,
      destination:null,
      departuretime:null,
      arrivaltime:null,
    }


    if(!rotation.flightIds || rotation.flightIds.length === 0){ //if no flights start with the aircrafts base
      if(!!aircraft) filters.origin = aircraft.base;
      return setFlightFilters({filters})
    }

    if(!!rotation.flightIds && rotation.flightIds.length === 1){ // if only one flight
      filters.origin = flightDocs[rotation.flightIds[0]].destination;
      filters.departuretime = flightDocs[rotation.flightIds[0]].arrivaltime + minutes20
      return setFlightFilters({filters})
    }

    if(!!rotation.flightIds){
      const _flights = rotation.flightIds.map(id => flightDocs[id])
      const allFlights = Object.values(flightDocs);
      const gap = _flights.findIndex((_flight,i) =>{ // look for gaps in flights to see if any unused flights would work
        const _flight2 = _flights[i + 1]
        if(!_flight2) return false;
        return allFlights.some(_f =>{
          return (_f.departuretime > (_flight.arrivaltime + minutes20)) && ((_f.arrivaltime + minutes20) < _flight2.departuretime) && (_f.origin === _flight.destination) && (_f.destination === _flight2.origin)
        })
      })
      if(gap > -1){
        const _flight = _flights[gap]
        const _flight2 = _flights[gap + 1]

        filters.origin = _flight.destination;
        filters.destination = _flight2.origin;
        filters.departuretime = _flight.arrivaltime + minutes20;
        filters.arrivaltime = _flight2.departuretime - minutes20;

        return setFlightFilters({filters})

      }
      else { // use last flights info for filter
        const _flight = _flights[_flights.length - 1]
        filters.origin = _flight.destination;
        filters.departuretime = _flight.arrivaltime + minutes20;

        return setFlightFilters({filters})

      }
    }
    
    return setFlightFilters({filters})
  }))

  constructor(
    private actions$: Actions,
    private store:Store<any>
  ) {}
}
