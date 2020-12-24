import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LbOrdersComponent } from './lb-orders.component';

describe('LbOrdersComponent', () => {
  let component: LbOrdersComponent;
  let fixture: ComponentFixture<LbOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LbOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LbOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
