import { TestBed } from '@angular/core/testing';

import { CacheserviceService } from './cacheservice.service';

describe('CacheserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CacheserviceService = TestBed.get(CacheserviceService);
    expect(service).toBeTruthy();
  });
});
