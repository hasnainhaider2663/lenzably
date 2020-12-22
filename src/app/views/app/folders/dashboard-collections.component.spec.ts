import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCollectionsComponent } from './dashboard-collections.component';

describe('UploadsComponent', () => {
  let component: DashboardCollectionsComponent;
  let fixture: ComponentFixture<DashboardCollectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCollectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
