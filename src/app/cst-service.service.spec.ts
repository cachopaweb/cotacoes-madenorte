import { TestBed } from '@angular/core/testing';

import { CSTServiceService } from './cst-service.service';

describe('CSTServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CSTServiceService = TestBed.get(CSTServiceService);
    expect(service).toBeTruthy();
  });
});
