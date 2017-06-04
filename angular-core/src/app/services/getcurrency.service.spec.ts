import { TestBed, inject } from '@angular/core/testing';

import { GetcurrencyService } from './getcurrency.service';

describe('GetcurrencyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetcurrencyService]
    });
  });

  it('should be created', inject([GetcurrencyService], (service: GetcurrencyService) => {
    expect(service).toBeTruthy();
  }));
});
