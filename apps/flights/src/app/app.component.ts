import { Component, OnInit } from "@angular/core";
import { FlightsService } from '@flights/data';
import { Store } from '@ngrx/store';
import { loadAircrafts, getAllAircrafts, loadFlights, getAllFlights, getFlightProgress, setRotationDate, getAircraftsWithRotations, getFlightsFilters, setSelectedAircraft, getSelectedAircraftId, getSelectedRotations, addFlight, getSelectedRotationFlights, removeFlight, getNoRotation, getRotationSchedul, getFlightFilters, setFlightFilters, addAircraft, getFlightsCount } from '@flights/store';
import { inherits } from 'util';

@Component({
  selector: "flights-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit  {
  title = "flights";

  progress = this.store.select(getFlightProgress);
  aircrafts = this.store.select(getAircraftsWithRotations);
  selectedAircraftId =this.store.select(getSelectedAircraftId)
  flights = this.store.select(getFlightsFilters)
  selectedRotation = this.store.select(getSelectedRotations)
  rotationFlights = this.store.select(getSelectedRotationFlights)
  noRotation = this.store.select(getNoRotation)
  rotationchedual = this.store.select(getRotationSchedul)
  flightFilters = this.store.select(getFlightFilters)
  totalFlightsCount = this.store.select(getFlightsCount)


  constructor(private store:Store<any>){
   
  }

  ngOnInit(){

    this.store.dispatch(loadAircrafts())

    this.store.dispatch(loadFlights())

  }

  setRotationDate(_ev){
    this.store.dispatch(setRotationDate({date:_ev.value}))
  }

  setAircraft(ev){
    this.store.dispatch(setSelectedAircraft(ev))
  }

  addToRotation(ev){
    this.store.dispatch(addFlight(ev))
  }

  flightRemoved(ev){
    this.store.dispatch(removeFlight(ev))
  }

  setFilters(ev){
    this.store.dispatch(setFlightFilters(ev))
  }

  addAircrafts(){
    this.store.dispatch(addAircraft())
  }
}
