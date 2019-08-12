import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'flights-rotation',
  templateUrl: './rotation.component.html',
  styleUrls: ['./rotation.component.scss']
})
export class RotationComponent implements OnInit {
  @Input() selectedRotation
  @Input() flights
  @Input() disabled = false;
  @Output() flightRemoved:EventEmitter<{id:string}> = new EventEmitter() 
  constructor() { }

  ngOnInit() {
  }

  removeFlight(id){
    this.flightRemoved.emit({id})
  }

}
