import { TestBed } from '@angular/core/testing';

import { DashboardProfileGuardService } from './dashboard-profile-guard.service';

describe('DashboardProfileGuardService', () => {
  let service: DashboardProfileGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardProfileGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
