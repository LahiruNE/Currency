import { TestBed, inject } from '@angular/core/testing';

import { GetcountryService } from './getcountry.service';

describe('GetcountryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetcountryService]
    });
  });

  it('should be created', inject([GetcountryService], (service: GetcountryService) => {
    expect(service).toBeTruthy();
  }));
});
