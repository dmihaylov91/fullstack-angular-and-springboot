import { TestBed } from '@angular/core/testing';

import { FootballApiServiceService } from './football-api-service.service';

describe('FootballApiServiceService', () => {
  let service: FootballApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FootballApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
