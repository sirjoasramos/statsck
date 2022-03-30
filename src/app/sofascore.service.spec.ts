import { TestBed } from '@angular/core/testing';

import { SofascoreService } from './sofascore.service';

describe('SofascoreService', () => {
  let service: SofascoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SofascoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
