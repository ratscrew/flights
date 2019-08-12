import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FlightsService } from './flights.service';
import { AircraftsService } from './aircrafts.service';
import { RotationsService } from './rotations.service';
export { FlightsService } from './flights.service';
export { AircraftsService } from './aircrafts.service';
export { RotationsService } from './rotations.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  providers:[
    FlightsService,
    AircraftsService,
    RotationsService
  ]
})
export class DataModule {}
