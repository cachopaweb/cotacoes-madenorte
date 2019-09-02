import { TestBed } from '@angular/core/testing';

import { CotacaoServiceService } from './cotacao-service.service';

describe('CotacaoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CotacaoServiceService = TestBed.get(CotacaoServiceService);
    expect(service).toBeTruthy();
  });
});
