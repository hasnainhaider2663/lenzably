import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LbOrderDetailsComponent } from './lb-order-details.component';

describe('LbOrderDetailsComponent', () => {
  let component: LbOrderDetailsComponent;
  let fixture: ComponentFixture<LbOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LbOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LbOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
