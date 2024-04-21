import { TestBed } from '@angular/core/testing';

import { WithoutTokenGuardService } from './without-token-guard.service';

describe('WithoutTokenGuardService', () => {
  let service: WithoutTokenGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WithoutTokenGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
