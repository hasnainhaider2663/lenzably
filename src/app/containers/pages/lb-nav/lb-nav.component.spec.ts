import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LbNavComponent } from './lb-nav.component';

describe('LbNavComponent', () => {
  let component: LbNavComponent;
  let fixture: ComponentFixture<LbNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LbNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LbNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
