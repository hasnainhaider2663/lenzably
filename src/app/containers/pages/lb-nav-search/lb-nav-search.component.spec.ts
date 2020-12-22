import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LbNavSearchComponent } from './lb-nav-search.component';

describe('LbNavSearchComponent', () => {
  let component: LbNavSearchComponent;
  let fixture: ComponentFixture<LbNavSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LbNavSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LbNavSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
