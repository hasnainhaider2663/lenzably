import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LbGridComponent } from './lb-grid.component';

describe('LbGridComponent', () => {
  let component: LbGridComponent;
  let fixture: ComponentFixture<LbGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LbGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LbGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
