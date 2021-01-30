import { TestBed } from '@angular/core/testing';

import { ManipulationService } from './manipulation.service';

describe('ManipulationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManipulationService = TestBed.get(ManipulationService);
    expect(service).toBeTruthy();
  });
});
