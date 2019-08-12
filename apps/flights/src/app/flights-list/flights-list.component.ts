import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlightsEntity } from '@flights/store';

@Component({
  selector: 'flights-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.scss']
})
export class FlightsListComponent implements OnInit {
  @Input() filters:any = {}
  @Input() flights : FlightsEntity[] = [];
  @Input() disabled = false;
  @Input() totalFlightsCount = 0;
  @Output() addToRotation:EventEmitter<{id:string}> = new EventEmitter()
  @Output() setFilters:EventEmitter<{filters:{[key:string]:any}}> = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }

  addFlightToRotation(id){
    this.addToRotation.emit({id})
  }

  trackBy(i,doc){
    return doc.id
  }

  setFilter(key,value){
    if(key === 'departuretime-hours'){
      value = this.fromHoursAndMinutes(value,this.getMinutes(this.filters.departuretime))
      key = 'departuretime'
    }
    if(key === 'departuretime-minutes'){
      value = this.fromHoursAndMinutes(this.getHours(this.filters.departuretime),value)
      key = 'departuretime'
    }
    if(key === 'arrivaltime-hours'){
      value = this.fromHoursAndMinutes(value,this.getMinutes(this.filters.arrivaltime))
      key = 'arrivaltime'
    }
    if(key === 'arrivaltime-minutes'){
      value = this.fromHoursAndMinutes(this.getHours(this.filters.arrivaltime),value)
      key = 'arrivaltime'
    }

    if((key === 'origin' || key === 'destination') && value === ''){
      value = null;
    }

    this.setFilters.emit({filters:{[key]:value}})
  }

  getHours(val){
    return Math.floor(val/60/60)
  }

  getMinutes(val){
    const h = this.getHours(val) * 60 * 60
    return Math.round(val - h) / 60
  }

  fromHoursAndMinutes(hours,minutes){
    return ((hours || 0) * 60 * 60) + ((minutes || 0) * 60)
  }

  duration(departuretime,arrivaltime){
    const _d = arrivaltime - departuretime;
    return `${this.getHours(_d)}:${this.fillZero(this.getMinutes(_d))}`
  }

  fillZero(val){
    if(val.toString().length < 2) return '0' + val;
    else return  val.toString()
  }

}
