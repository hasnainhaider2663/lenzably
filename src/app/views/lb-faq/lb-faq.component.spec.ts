import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LbFaqComponent } from './lb-faq.component';

describe('LbFaqComponent', () => {
  let component: LbFaqComponent;
  let fixture: ComponentFixture<LbFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LbFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LbFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
