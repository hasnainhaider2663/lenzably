import { TestBed } from '@angular/core/testing';

import { AngularFireService } from './angular-fire.service';

describe('AngularFireService', () => {
  let service: AngularFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
