import { createSelector } from '@ngrx/store';
import { getAllAircrafts } from './aircrafts.selectors';
//import { getRotationsForDate } from '@flights/store';
import { getRotationsForDate } from '../rotations/rotations.selectors';

export const getAircraftsWithRotations = createSelector(
    getAllAircrafts,
    getRotationsForDate,
    (aircrafts, rotations):any[] => {
        return aircrafts.map(_a => {
            return {..._a,rotation:rotations.find(_r => _r.aircraftId === _a.ident) || {}};
        });
    }
  );