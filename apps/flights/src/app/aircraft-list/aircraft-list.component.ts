import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AircraftsEntity } from '@flights/store';

@Component({
  selector: 'flights-aircraft-list',
  templateUrl: './aircraft-list.component.html',
  styleUrls: ['./aircraft-list.component.scss']
})
export class AircraftListComponent implements OnInit {
  @Input() selectedId = ""
  @Input() aircrafts:any[]
  @Output() changeSelection:EventEmitter<{id:string}> = new EventEmitter()
  @Output() addAircraft:EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }

  selectAircraft(id:string){
    this.changeSelection.emit({id})
  }

  addAircrafts(){
    this.addAircraft.emit()
  }

}
