import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LbNavMobileComponent } from './lb-nav-mobile.component';

describe('LbNavMobileComponent', () => {
  let component: LbNavMobileComponent;
  let fixture: ComponentFixture<LbNavMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LbNavMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LbNavMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
