import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getRotationsState } from './rotations.selectors';
import { RotationsState } from './rotations.reducer';
import { RotationsEntity } from './rotations.models';
import { getSelectedAircraftId } from '../aircrafts/aircrafts.selectors';
import { getFlightsEntities } from '../flights/flights.selectors';
import { FlightsEntity } from '../flights/flights.models';


export const getSelectedRotations = createSelector(
    getRotationsState,
    getSelectedAircraftId,
    (state: RotationsState, aircraftId) => {
      const id = aircraftId + (state.selectedDate || new Date()).toDateString()
      return state.rotations[id] || {id:id, date:(state.selectedDate || new Date()).toDateString(), aircraftId, flightIds:[]}
    }
  );


  export const getSelectedRotationFlights = createSelector(
    getSelectedRotations,
    getFlightsEntities,
    (rotation, flightDocs) => {
      return (<string[]>rotation.flightIds).map((id:any):any=>{
        return flightDocs[id]
      }) 
    }
  );

  export const getNoRotation = createSelector(
    getRotationsState,
    getSelectedAircraftId,
    (state: RotationsState, aircraftId) => {
      return !aircraftId || !state.selectedDate;
    }
  );

  export const getRotationSchedul = createSelector(
    getSelectedRotationFlights,
    (flights) => {
      const day = 60 * 60 * 24
      return flights.reduce((acc,_flight,i)=>{
        const _flight2 = flights[i+1]
        const turnaroundItem:any = {duration: 20 * 60, startTime:_flight.departuretime, type:'turnaround', error:false}; 
        const _fItem:any = {..._flight, duration: _flight.arrivaltime - _flight.departuretime,  type:'flight', error:false}
        if(_flight2 && _flight2.departuretime < (_flight.arrivaltime + turnaroundItem.duration) ){
          turnaroundItem.duration = (_flight2.departuretime - _flight.arrivaltime)
          turnaroundItem.error = true
        }

        if(_flight2 && _flight.arrivaltime > _flight2.departuretime ){
          _fItem.duration = _flight2.departuretime - _flight.departuretime
          _fItem.error = true;
        }

        if(_flight.arrivaltime < _flight.departuretime){
          turnaroundItem.duration = 0;
          _fItem.duration = day - _flight.departuretime;
          _fItem.error = true;
        }

        _fItem.startP =  (_flight.departuretime/day) * 100
        _fItem.lengthP = (_fItem.duration/day) * 100

        const itemBefor = acc[acc.length - 1];
        if(!!itemBefor && itemBefor.type === 'flight' && itemBefor.duration !== (itemBefor.arrivaltime - itemBefor.departuretime)) _fItem.error = true;

        acc.push(_fItem)

        if(turnaroundItem.duration > 0) {
          turnaroundItem.startP =  (_flight.arrivaltime/day) * 100
          turnaroundItem.lengthP = (turnaroundItem.duration/day) * 100
          acc.push(turnaroundItem)
        }

        return acc;
      },[])
      
    }
  );

