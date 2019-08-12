import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationChartComponent } from './rotation-chart.component';

describe('RotationChartComponent', () => {
  let component: RotationChartComponent;
  let fixture: ComponentFixture<RotationChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotationChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
