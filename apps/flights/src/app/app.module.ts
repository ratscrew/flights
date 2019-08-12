import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { DataModule } from '@flights/data'
import { StoresModule } from '@flights/store'
import { MaterialModule } from '@flights/material';
import { AircraftListComponent } from './aircraft-list/aircraft-list.component';
import { RotationComponent } from './rotation/rotation.component';
import { FlightsListComponent } from './flights-list/flights-list.component';
import { RotationChartComponent } from './rotation-chart/rotation-chart.component'

@NgModule({
  declarations: [AppComponent, AircraftListComponent, RotationComponent, FlightsListComponent, RotationChartComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    DataModule,
    StoresModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
