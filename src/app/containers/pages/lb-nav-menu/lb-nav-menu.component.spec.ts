import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LbNavMenuComponent } from './lb-nav-menu.component';

describe('LbNavMenuComponent', () => {
  let component: LbNavMenuComponent;
  let fixture: ComponentFixture<LbNavMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LbNavMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LbNavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
