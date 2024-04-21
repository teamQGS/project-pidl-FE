import { TestBed } from '@angular/core/testing';

import { WithTokenGuardService } from './with-token-guard.service';

describe('WithTokenGuardService', () => {
  let service: WithTokenGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WithTokenGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
