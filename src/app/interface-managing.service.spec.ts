import { TestBed } from '@angular/core/testing';

import { InterfaceManagingService } from './interface-managing.service';

describe('InterfaceManagingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterfaceManagingService = TestBed.get(InterfaceManagingService);
    expect(service).toBeTruthy();
  });
});
