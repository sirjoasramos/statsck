import { TestBed } from '@angular/core/testing';

import { TorneioService } from './torneio.service';

describe('TorneioService', () => {
  let service: TorneioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TorneioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
