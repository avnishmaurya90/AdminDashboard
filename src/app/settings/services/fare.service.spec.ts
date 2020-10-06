import { TestBed, inject } from '@angular/core/testing';

import { FareService } from './fare.service';

describe('FareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FareService]
    });
  });

  it('should be created', inject([FareService], (service: FareService) => {
    expect(service).toBeTruthy();
  }));
});
