import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromFlights from './+state/flights/flights.reducer';
import { FlightsEffects } from './+state/flights/flights.effects';
import * as fromAircrafts from './+state/aircrafts/aircrafts.reducer';
import { AircraftsEffects } from './+state/aircrafts/aircrafts.effects';
import * as fromRotations from './+state/rotations/rotations.reducer';
import { RotationsEffects } from './+state/rotations/rotations.effects';
import { DataModule } from '@flights/data';

export *  from './+state/aircrafts/aircrafts.actions';
export *  from './+state/rotations/rotations.actions';
export *  from './+state/flights/flights.actions';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromFlights.FLIGHTS_FEATURE_KEY,
      fromFlights.Flightsreducer
    ),
    EffectsModule.forFeature([FlightsEffects]),
    StoreModule.forFeature(
      fromAircrafts.AIRCRAFTS_FEATURE_KEY,
      fromAircrafts.Aircraftsreducer
    ),
    EffectsModule.forFeature([AircraftsEffects]),
    StoreModule.forFeature(
      fromRotations.ROTATIONS_FEATURE_KEY,
      fromRotations.RotationsReducer
    ),
    EffectsModule.forFeature([RotationsEffects]),
    DataModule
  ]
})
export class StoresModule {}
