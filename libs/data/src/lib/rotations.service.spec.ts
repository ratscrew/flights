import { TestBed } from '@angular/core/testing';

import { RotationsService } from './rotations.service';

describe('RotationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RotationsService = TestBed.get(RotationsService);
    expect(service).toBeTruthy();
  });
});
