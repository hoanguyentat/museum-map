import { TestBed, inject } from '@angular/core/testing';

import { MapInfoService } from './map-info.service';

describe('MapInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapInfoService]
    });
  });

  it('should be created', inject([MapInfoService], (service: MapInfoService) => {
    expect(service).toBeTruthy();
  }));
});
