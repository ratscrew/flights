import { createSelector } from '@ngrx/store';
import { getAllFlights, getFlightFilters } from './flights.selectors';
import { getRotationsForDate } from '../rotations/rotations.selectors';

export const getFlightsFilters = createSelector(
    getAllFlights,
    getRotationsForDate,
    getFlightFilters,
    (flights, rotationsForDate, filters) => flights.filter(_f => {
      if(!_f) return false;

      if(filters.departuretime){
        if(_f.departuretime < filters.departuretime) return false;
      }
      if(filters.arrivaltime){
        if(_f.arrivaltime > filters.arrivaltime) return false;
      }

      if(filters.origin){
        if(_f.origin !== filters.origin) return false;
      }
      if(filters.destination){
        if(_f.origin !== filters.destination) return false;
      }

      if(!filters.alreadyInUs){
        if(rotationsForDate.some(_r => {
          if(_r.flightIds) return _r.flightIds.indexOf(_f.id) > -1
          return false;
        })) return false
      }

      return true;

    }).sort((_a,_b)=>{
      if(_a.departuretime > _b.departuretime) return 1;
      if(_a.departuretime < _b.departuretime) return -1;
      return 0
    })
  );