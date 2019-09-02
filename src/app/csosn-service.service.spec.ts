import { TestBed } from '@angular/core/testing';

import { CSOSNServiceService } from './csosn-service.service';

describe('CSOSNServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CSOSNServiceService = TestBed.get(CSOSNServiceService);
    expect(service).toBeTruthy();
  });
});
