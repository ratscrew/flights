import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'flights-rotation-chart',
  templateUrl: './rotation-chart.component.html',
  styleUrls: ['./rotation-chart.component.scss']
})
export class RotationChartComponent implements OnInit {
  @Input() schedual: any[] = []
  constructor() { }

  ngOnInit() {
  }

}
